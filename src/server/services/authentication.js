const passport = require("passport");
const jwt = require("jsonwebtoken");
import uuidv4 from "uuid/v4";
//const config = require('../config/config');
const crypto = require("crypto");
//const LocalStrategy = require('passport-local').Strategy;
const argon2 = require("argon2");
const speakeasy = require("speakeasy");
const qrCode = require("qrcode");

import userService from "./user";
import Config from "../../../utilities/Config";

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
  RegisterAsync: async ({ email, displayName, password, role }, timeZone) => {
    const user = { email, displayName, password, role };

    const emailVerificationObject = await registerAsync(user);

    const options = getRegisterMailOptions(emailVerificationObject, timeZone);

    return await sendEmailAsync(options);
  },

  VerifyEmailAddressAsync: async (email, emailVerificationString) => {
    return await verifyEmailAddressAsync(email, emailVerificationString);
  },

  LoginAsync: async ({ email, password, req }) => {
    return await loginAsync({ email, password, req });
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

  // Activate2FactorAuthentication: email => {
  //   return activate2FactorAuthentication(email).then(qrCode => {
  //     return qrCode;
  //   });
  // },

  // VerifyTwoFactorCode: (token, email) => {
  //   return verifyTwoFactorCode(token, email).then(verified => {
  //     return verified;
  //   });
  // },

  SendPasswordResetAsync: async ({ email, timeZone }) => {
    try {
      const passwordResetObject = await generatePasswordResetTokenAsync(email);

      if (!passwordResetObject) {
        return email;
      }

      const options = getResetPasswordMailOptions(passwordResetObject, timeZone);

      await sendEmailAsync(options);

      return email;
    }
    catch(err) {
      console.log("SendPasswordResetAsync error", err);
      throw err;
    }
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

  VerifyPasswordResetTokenAsync: async ({ email, token }) => {
    return await verifyPasswordResetTokenAsync(email, token);
  },

  ResetChangePasswordAsync: async ({email, token, password}) => {
    return await resetChangePasswordAsync(email, token, password);
  },

  GetNewUser: () => {
    return getNewUser();
  }
};

export default authService;

function generateJwt(user) {
  return jwt.sign(user, Config.jwt.secret, Config.jwt.options);
}

async function registerAsync(userObject) {
  try {
    const user = getNewUser();
    const emailVerificationString = crypto.randomBytes(32).toString("base64");

    user.email = userObject.email;
    user.displayName = userObject.displayName;
    user.role = userObject.role;

    // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    const hash = await argon2.hash(userObject.password, { type: argon2.argon2id });
    user.passwordHash = hash;

    user.emailVerificationHash = await argon2.hash(emailVerificationString, { type: argon2.argon2id });
    user.emailVerificationExpiry = getUTCFutureDate(1, "hours"); // Expires in 1 hour. Make it a shorter time for production app.

    const regUser = await userService.CreateOne(user) // will return an array with a single user
    const { email, emailVerificationExpiry } = regUser[0];

    const emailVerificationObj = { email, emailVerificationString, emailVerificationExpiry }
    return emailVerificationObj;
  }
  catch(err) {
    console.log("register error", err)
    throw err;
  }
}

async function verifyEmailAddressAsync({ email, emailVerificationString }) {
  try {
    const user = await userService.FindOne(email);

    if (!user) {
      return { verified: false, message: "verify-email-error" };
    }

    if (user.verified) {
      return { verified: true, message: "" };
    }

    if (!isFirstUTCDateAfterSecond(user.emailVerificationExpiry, getUTCDate())) {
      return { verified: false, message: "expired-email-token-error" };
    }

    const verified = await argon2.verify(user.emailVerificationHash, emailVerificationString);

    if (!verified) {
      return { verified: false, message: "verifiy-email-error" };
    }

    user.emailVerificationExpiry = null;
    user.emailVerificationHash = null;
    user.verified = true;
    user.registerDate = getUTCDate();

    await userService.UpdateOne(user);

    return { verified: true, message: "" };
  }
  catch(err) {
    console.log("verifyEmailAddress error", err)
    throw err;
  }
}

async function loginAsync({ email, password, req }) {
  try {
    const user = await userService.FindOne(email);

    if (!user) {
      throw new Error("credentials-error");
    }

    const validated = await validateUserPasswordAsync(user.passwordHash, password);

    if (!validated) {
      throw new Error("credentials-error");
    }

    user.lastAccessDate = getUTCDate();

    const updUserArray = await userService.UpdateOne(user);
    let updUser = updUserArray[0];

    const payload = {
      email: updUser.email,
      displayName: updUser.displayName,
      role: updUser.role
    };

    const token = generateJwt(payload);

    req.res.cookie(Config.jwt.cookieName, token, Config.jwt.cookie);

    return payload;
  }
  catch(err) {
    console.log("login error" , err)
    throw err;
  }
}

async function validateUserPasswordAsync(hash, password) {
  try {
    const verified = await argon2.verify(hash, password);

    if (verified) {
      return verified;
    }

      return false;
  }
  catch(err) {
    console.log("validateUserPassword error ", err)
    throw err
  }
}

async function getUserAsync(email) {
  try {
    return await userService.FindOne({ email: email });
  }
  catch(err) {
    console.log("getUser error", err)
    throw err;
  }
}

// function activate2FactorAuthentication(email) {
//   let promise = new Promise((resolve, reject) => {
//     //User.findOne({email: email})
//     userService.FindOne({ email: email }).then(user => {
//       if (!user) {
//         throw new Error("Error getting user");
//       } else {
//         let twoFactorSecret = speakeasy.generateSecret();
//         let token = speakeasy.totp({
//           secret: twoFactorSecret.base32,
//           encoding: "base32",
//           algorithm: "sha256"
//         });
//         user.tempTwoFactorSecret = twoFactorSecret;
//         //user.save();
//         userService.UpdateOne(user);
//         qrCode.toDataURL(twoFactorSecret.otpauth_url, (error, dataUrl) => {
//           if (error) {
//             console.log("error creating qrcode");
//             console.log(error);
//           }
//           resolve(dataUrl);
//         });
//       }
//     });
//   });
//   return promise;
// }

// function verifyTwoFactorCode(token, email) {
//   // return User.findOne({email: email})
//   return userService.FindOne({ email: email }).then(user => {
//     if (!user) {
//       throw new Error("error getting user");
//     } else {
//       let verified = speakeasy.totp.verify({
//         secret: user.tempTwoFactorSecret.base32,
//         encoding: "base32",
//         token: token.toString()
//       });
//       if (verified === true) {
//         user.twoFactorSecret = user.tempTwoFactorSecret;
//         user.tempTwoFactorSecret = null;
//         //user.save();
//         userService.UpdateOne(user);
//       }
//       return { verified: verified, user: user };
//     }
//   });
// }

async function generatePasswordResetTokenAsync(email) {
  try {
    const user = await userService.FindOne(email);

    if (!user) {
      return null;
    }

    const passwordResetString = crypto.randomBytes(32).toString("base64");
    const hash = await argon2.hash(passwordResetString, { type: argon2.argon2id });

    user.passwordResetHash = hash;
    user.passwordResetExpiry = getUTCFutureDate(10, "minutes"); 

    const updUserArray = await userService.UpdateOne(user);
    const { email, passwordResetExpiry } = updUserArray[0];
    
    const resetPasswordObj = { email, passwordResetString, passwordResetExpiry };
    
    return resetPasswordObj;
  }
  catch(err) {
    console.log("generatePasswordResetTokenAsync error ", err);
    throw err;
  }
}

async function verifyPasswordResetTokenAsync(email, token) {
  try {
    const user = await userService.FindOne(email);

    if (!user) {
      return { verified: false, message: "verification-token-error" };
    }

    if (!isFirstUTCDateAfterSecond(user.passwordResetExpiry, getUTCDate()) ) {
      return { verified: false, message: "expired-email-token-error" };
    }

    const verified = await argon2.verify(user.passwordResetHash, token);

    if (verified) {
      return { verified: verified, message: "" };
    } 
    else {
      return { verified: verified, message: "verification-token-error" };
    }

  }
  catch(err) {
    console.log("verifyPasswordResetTokenAsync error", err);
    throw err;
  }
}

async function resetChangePasswordAsync(email, token, password) {
  try {
    const verifyObj = await verifyPasswordResetToken(email, token);

    if (!verifyObj.verified) {
      reject(verifyObj.message);
    }

    const user = await userService.FindOne(email);

    user.passwordResetExpiry = null;
    user.passwordResetHash = null;

    // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa        
    const hash = await argon2.hash(password, { type: argon2.argon2id });
    user.passwordHash = hash;

    await userService.UpdateOne(user);

    return { saved: true, message: ""};
  }
  catch(err) {
    console.log("resetChangePasswordAsync error", err)
  }
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
    id: uuidv4(),
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

async function sendEmailAsync(options) {
  const smtpTransport = createTransporter();

  try {
    return await smtpTransport.sendMail(options);
  }
  catch(err) {
    console.log("sendEmail error", err)
    throw err;
  }
}
