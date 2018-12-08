const passport = require("passport");
const jwt = require("jsonwebtoken");
import UUID from "node-uuid";
//const config = require('../config/config');
const crypto = require("crypto");
//const LocalStrategy = require('passport-local').Strategy;
const argon2 = require("argon2");
const speakeasy = require("speakeasy");
const qrCode = require("qrcode");

import userService from "./user";
import Config from "../../../utilities/Config";
import AuthorizationError from "../graphql/customErrors/AuthorizationError";
import {
  getRegisterMailOptions,
  getResetPasswordMailOptions,
  getUTCFutureDate,
  getUTCDate,
  isFirstUTCDateAfterSecond,
  convertStringToDate
} from "./authHelper";
import { createTransporter } from "../../../utilities/mailer";

let authService = {
  Register: ({ email, displayName, password, role }, timeZone) => {
    const user = { email, displayName, password, role };

    return register(user)
      .then(emailVerificationObject => {
        // send email
        const options = getRegisterMailOptions(
          emailVerificationObject,
          timeZone
        );

        return sendEmail(options)
          .then(email => {
            return email;
          })
          .catch(error => {
            console.log("Register Error: ", error);
            return error;
          });
      })
      .catch(error => {
        console.log("Register Error: ", error);
        return error;
      });
  },

  VerifyEmailAddress: (email, emailVerificationString) => {
    return verifyEmailAddress(email, emailVerificationString)
      .then(verified => {
        return verified;
      })
      .catch(error => {
        console.log("Verify Email Error: ", error);
        return error;
      });
  },

  Login: ({ email, password, req }) => {
    return login({ email, password, req })
      .then(result => {
        if (!result) {
          throw new Error("credentials-error");
        }
        if (result) {
          return result;
        }
      })
      .catch(error => {
        console.log("error logging in user");
        console.log(error);
        return error;
      });
  },

  GetUser: email => {
    return getUser(email)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log("error getting user");
        console.log(error);
        return error;
      });
  },

  Activate2FactorAuthentication: email => {
    return activate2FactorAuthentication(email).then(qrCode => {
      return qrCode;
    });
  },

  VerifyTwoFactorCode: (token, email) => {
    return verifyTwoFactorCode(token, email).then(verified => {
      return verified;
    });
  },

  SendPasswordReset: ({ email, timeZone }) => {
    return generatePasswordResetToken(email)
      .then(passwordResetObject => {
        const options = getResetPasswordMailOptions(
          passwordResetObject,
          timeZone
        );

        if (!options) {
          // email not found but dont tell user
          console.log("SendPasswordReset email not found");
          return email;
        } else {
          return sendEmail(options)
            .then(email => {
              return email;
            })
            .catch(error => {
              console.log("SendPasswordReset Error: ", error);
              throw new Error("email-error");
            });
        }
      })
      .catch(error => {
        console.log("Error Sending Reset Password");
        console.log(error);
        return error;
      });
  },

  ChangePassword: ({ email, password, newPassword }) => {
    return changePassword(email, password, newPassword).then(result => {
      return result;
    })
    .catch(error => {
      console.log("change password error ", error);
      throw error;
    });
  },

  VerifyPasswordResetToken: ({ email, token }) => {
    return verifyPasswordResetToken(email, token).then(result => {
      return result;
    });
  },

  ResetChangePassword: ({email, token, password}) => {
    return resetChangePassword(email, token, password).then(result => {
      return result;
    })
    .catch(error => {
      console.log("reset change password error ", error);
      throw error;
    });
  },

  GetNewUser: () => {
    return getNewUser();
  }
};

export default authService;

// async function validateUserPassword(hash, password) {
//   try {
//     return await argon2.verify(hash, password)
//   }
//   catch(e) {
//       console.log('error', e)
//       throw e;
//   }
// };

function generateJwt(user) {
  return jwt.sign(user, Config.jwt.secret, Config.jwt.options);
}

function register(userObject) {
  let promise = new Promise((resolve, reject) => {
    //let user = new User;
    let user = getNewUser();
    let emailVerificationString = crypto.randomBytes(32).toString("base64");

    user.email = userObject.email;
    user.displayName = userObject.displayName;
    user.role = userObject.role;

    argon2
      .hash(userObject.password, { type: argon2.argon2id })
      .then(hash => {
        // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        user.passwordHash = hash;
        argon2
          .hash(emailVerificationString, { type: argon2.argon2id })
          .then(emailVerificationHash => {
            user.emailVerificationHash = emailVerificationHash;
            //user.emailVerificationExpiry = new Date().valueOf() + (1000 * 60 * 60); // Expires in 1 hour. Make it a shorter time for production app.
            user.emailVerificationExpiry = getUTCFutureDate(1, "hours"); // Expires in 1 hour. Make it a shorter time for production app.
            //user.save((error) => {
            userService
              .CreateOne(user) // will return an array with a single user
              .then((regUser, error) => {
                if (error) {
                  console.log("error saving user");
                  console.log(error);
                  reject(error);
                }
                const { email, emailVerificationExpiry } = regUser[0];
                const emailVerificationObj = {
                  email,
                  emailVerificationString,
                  emailVerificationExpiry
                };
                resolve(emailVerificationObj);
              })
              .catch(error => {
                console.log("error creating user");
                console.log(error);
                reject(error);
              });
          });
      })
      .catch(error => {
        console.log("error hashing user password");
        console.log(error);
        reject(error);
      });
  });
  return promise;
}

function verifyEmailAddress({ email, emailVerificationString }) {
  let promise = new Promise((resolve, reject) => {
    userService
      .FindOne(email)
      .then(user => {
        if (user) {
          if (user.verified) {
            resolve({ verified: true, message: "" });
          }
          //if (user.emailVerificationExpiry > new Date().valueOf()) {
          if (
            isFirstUTCDateAfterSecond(
              user.emailVerificationExpiry,
              getUTCDate()
            )
          ) {
            argon2
              .verify(user.emailVerificationHash, emailVerificationString)
              .then(verified => {
                if (verified) {
                  console.log("verified from argon2");
                  user.emailVerificationExpiry = null;
                  user.emailVerificationHash = null;
                  user.verified = true;
                  user.registerDate = getUTCDate();

                  return userService
                    .UpdateOne(user)
                    .then(user => {
                      resolve({ verified: true, message: "" });
                    })
                    .catch(error => {
                      console.log("error verifying email address");
                      console.log(error);
                      reject(error);
                    });
                } else {
                  resolve({ verified: false, message: "verifiy-email-error" });
                }
              })
              .catch(error => {
                console.log("error verifying email address");
                console.log(error);
                reject(error);
              });
          } else {
            resolve({ verified: false, message: "expired-email-token-error" });
          }
        } else {
          console.log("user not found");
          resolve({ verified: false, message: "verify-email-error" });
        }
      })
      .catch(error => {
        console.log("error finding user");
        console.log(error);
        reject(error);
      });
  });
  return promise;
}

function login({ email, password, req }) {
  let promise = new Promise((resolve, reject) => {
    userService
      .FindOne(email)
      .then(user => {
        if (!user) {
          throw new Error("credentials-error");
        }

        validateUserPassword(user.passwordHash, password)
          .then(validated => {
            if (!validated) {
              throw new Error("credentials-error");
            }

            user.lastAccessDate = getUTCDate();

            userService
              .UpdateOne(user)
              .then(updUserArray => {
                let updUser = updUserArray[0];

                // dates stored as a string in neo4j
                // console.log("before conversion")
                // console.log("updUser.registerDate", updUser.registerDate)
                // console.log("updUser.lastAccessDate", updUser.lastAccessDate)
                // updUser.registerDate = convertStringToDate(updUser.registerDate)
                // updUser.lastAccessDate = convertStringToDate(updUser.lastAccessDate)
                // console.log("updUser.registerDate", updUser.registerDate)
                // console.log("updUser.lastAccessDate", updUser.lastAccessDate)
                // console.log("after conversion")

                const payload = {
                  email: updUser.email,
                  displayName: updUser.displayName,
                  role: updUser.role
                };

                const token = generateJwt(payload);

                req.res.cookie(Config.jwt.cookieName, token, Config.jwt.cookie);

                resolve(payload);
              })
              .catch(err => {
                console.log("UpdateOne error");
                reject(err);
              });
          })
          .catch(err => {
            console.log("FindOne error");
            reject(err);
          });
      })
      .catch(err => {
        console.log("FindOne error");
        reject(err);
      });
  });
  return promise;
}

function validateUserPassword(hash, password) {
  return argon2
    .verify(hash, password)
    .then(verified => {
      if (verified) {
        return verified;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log("error");
      console.log(error);
      return error;
    });
}

function getUser(email) {
  //return User.findOne({email: email})
  return userService.FindOne({ email: email }).then(user => {
    if (!user) {
      return { message: "Error getting user" };
    } else {
      return user;
    }
  });
}

function activate2FactorAuthentication(email) {
  let promise = new Promise((resolve, reject) => {
    //User.findOne({email: email})
    userService.FindOne({ email: email }).then(user => {
      if (!user) {
        throw new Error("Error getting user");
      } else {
        let twoFactorSecret = speakeasy.generateSecret();
        let token = speakeasy.totp({
          secret: twoFactorSecret.base32,
          encoding: "base32",
          algorithm: "sha256"
        });
        user.tempTwoFactorSecret = twoFactorSecret;
        //user.save();
        userService.UpdateOne(user);
        qrCode.toDataURL(twoFactorSecret.otpauth_url, (error, dataUrl) => {
          if (error) {
            console.log("error creating qrcode");
            console.log(error);
          }
          resolve(dataUrl);
        });
      }
    });
  });
  return promise;
}

function verifyTwoFactorCode(token, email) {
  // return User.findOne({email: email})
  return userService.FindOne({ email: email }).then(user => {
    if (!user) {
      throw new Error("error getting user");
    } else {
      let verified = speakeasy.totp.verify({
        secret: user.tempTwoFactorSecret.base32,
        encoding: "base32",
        token: token.toString()
      });
      if (verified === true) {
        user.twoFactorSecret = user.tempTwoFactorSecret;
        user.tempTwoFactorSecret = null;
        //user.save();
        userService.UpdateOne(user);
      }
      return { verified: verified, user: user };
    }
  });
}

function generatePasswordResetToken(email) {
  let promise = new Promise((resolve, reject) => {
    userService
      .FindOne(email)
      .then(user => {
        if (!user) {
          console.log("reject");
          resolve();
        } else {
          let passwordResetString = crypto.randomBytes(32).toString("base64");
          argon2
            .hash(passwordResetString, { type: argon2.argon2id })
            .then(hash => {
              user.passwordResetHash = hash;
              user.passwordResetExpiry = getUTCFutureDate(10, "minutes"); 

              userService
                .UpdateOne(user)
                .then(updUserArray => {
                  const { email, passwordResetExpiry } = updUserArray[0];
                  const resetPasswordObj = {
                    email,
                    passwordResetString,
                    passwordResetExpiry
                  };

                  resolve(resetPasswordObj);
                })
                .catch(error => {
                  console.log("update rest hash error");
                  console.log(error);
                  reject(error);
                });
            });
        }
      })
      .catch(error => {
        console.log("generatePasswordResetCode find one error");
        console.log(error);
        reject(error);
      });
  });
  return promise;
}

function verifyPasswordResetToken(email, token) {
  let promise = new Promise((resolve, reject) => {
    return userService
      .FindOne(email)
      .then(user => {
        if (!user) {
          resolve({ verified: false, message: "verification-token-error" });
        } else {
          if (isFirstUTCDateAfterSecond(user.passwordResetExpiry, getUTCDate())) {
            argon2.verify(user.passwordResetHash, token)
              .then(verified => {
                if (verified) {
                  resolve({ verified: verified, message: "" });
                } else {
                  resolve({ verified: verified, message: "verification-token-error" });
                }
              })
              .catch(error => {
                console.log("verifying reset token error ", error );
                resolve({ verified: verified, message: "verification-token-error" });
              });
          } else {
            console.log("error verifying reset expired");
            resolve({ verified: false, message: "expired-email-token-error" });
          }
        }
      })
      .catch(error => {
        console.log("finding user after reset verification error", error);
        resolve({ verified: false, message: "verification-token-error" });
      });
  })
  return promise;
}

function resetChangePassword(email, token, password) {
  let promise = new Promise((resolve, reject) => {
    verifyPasswordResetToken(email, token)
      .then(verifyObj => {
        if (!verifyObj.verified) {
          reject(verifyObj.message);
        }

        userService
          .FindOne(email)
          .then(user => {
            user.passwordResetExpiry = null;
            user.passwordResetHash = null;

            argon2.hash(password, { type: argon2.argon2id }).then(hash => {
              // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
              user.passwordHash = hash;
              userService.UpdateOne(user);

              const retObj = { saved: true, message: ""};
              resolve(retObj);
            })
              .catch(error => {
                console.log("resetChangePassword password hash error ", error);
                reject(error);
              });
          })
      })
      .catch(error => {
        console.log("resetChangePassword -> checkPasswordResetToken error", error);
        reject(error);
      });
  });
  return promise;
}

function changePassword(email, password, newPassword) {
  let promise = new Promise((resolve, reject) => {
    userService
      .FindOne(email)
      .then(user => {
        if (!user) {
          reject(new Error("credentials-error"))
        } else {

          validateUserPassword(user.passwordHash, password)
          .then(validated => {
            if (!validated) {
              reject(new Error("credentials-error"))
            }

            argon2.hash(newPassword, { type: argon2.argon2id }).then(hash => {
              // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
              user.passwordHash = hash;
              userService.UpdateOne(user);

              const retObj = { saved: true, message: ""};
              resolve(retObj);
            })
            .catch(error => {
              console.log("change password hash error ", error);
              reject(error);
            });
          })
          .catch(error => {
            console.log("change password validating password error ", error);
            reject(error);
          });
        }
      })
      .catch(error => {
        console.log("change password find user error ", error);
        reject(error);
      });
    });
  return promise;
}

function getNewUser() {
  return {
    email: "",
    passwordHash: "",
    displayName: "Guest",
    role: "Guest",
    registerDate: {},
    lastAccessDate: {},
    verified: false,
    emailVerificationHash: "",
    emailVerificationExpiry: 0,
    passwordResetHash: "",
    tempTwoFactorSecret: {},
    twoFactorSecret: {}
  };
}

// function getEmailVerificationObj(provider) {
//   const { email, emailVerificationString, emailVerificationExpiry } = provider;

//   return {
//     email: email,
//     emailVerificationString: emailVerificationString,
//     emailVerificationExpiry: emailVerificationExpiry
//   };
// }

function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const smtpTransport = createTransporter();

    smtpTransport.sendMail(options, (err, resp) => {
      if (err) {
        reject(err);
      }
      if (resp) {
        resolve(options.email);
      }
    });
  });
}
