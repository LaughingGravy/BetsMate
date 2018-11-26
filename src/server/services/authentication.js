const passport = require('passport');
const jwt = require('jsonwebtoken');
import UUID from 'node-uuid'
//const config = require('../config/config');
const crypto = require('crypto');
//const LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');
const speakeasy = require('speakeasy');
const qrCode = require('qrcode');

import userService from './user'
import Config from '../../../utilities/Config'
import AuthorizationError from '../graphql/customErrors/AuthorizationError'
import { getRegisterMailOptions, getResetPasswordMailOptions, getUTCFutureDate, getUTCDate, isFirstUTCDateAfterSecond, convertStringToDate } from './authHelper'
import { createTransporter } from '../../../utilities/mailer'

//SerializeUser is used to provide some identifying token that can be saved
//in the users session.  We traditionally use the 'ID' for this.
// passport.serializeUser((user, done) => {
//   console.log("serializeUser")
//   done(null, user.id);
// });

// given a session token we verify it and decode it to the idr
// finally we return the user object found using the decoded token
// This object is placed on req.user
// passport.deserializeUser((id, done) => {
//   console.log("deserializeUser id", id)
//   if (id) {
//     jwt.verify(id, Config.secret, (error, decodedId) => {
//       if (error) {
//         done(error)
//       }
//       else {
//         userService.FindById(decodedId)
//         .then(user => {
//           done(null, user)
//         })
//         .catch(err => {
//           done(err);
//         })
//       }
//     })
//   }
// });


// passport.use(new LocalStrategy ({ usernameField: 'email' }, (email, password, done) => {
  
//   console.log("passport.use")
//   done(null)
//   //userService.FindOne(email, (error, user) => {
//   // return userService.FindOne(email)
//   //   .then(user => {
//   //      validateUserPassword(user.passwordHash, password)
//   //       .then((validated) => {
//   //         if (validated) {
//   //           return done(user);
//   //           } 
//   //         else {
//   //             return done(null, false, {
//   //               //message: "credentials-error" // Do not give password not found error. Give them the exact same message as for user not found, eg. 'Invalid login credentials'. 
//   //               message: "boo2"
//   //             })                            
//   //         }          
//   //       })
//   //     })

//   //   })
// }));

// passport.use(new BasicStrategy ({ usernameField: 'email' }, (email, password, done) => {
  
//   console.log("passport.use")
//   done(null)
//   userService.FindOne(email, (error, user) => {
//   return userService.FindOne(email)
//     .then(user => {
//        validateUserPassword(user.passwordHash, password)
//         .then((validated) => {
//           if (validated) {
//             return done(user);
//             } 
//           else {
//               return done(null, false, {
//                 //message: "credentials-error" // Do not give password not found error. Give them the exact same message as for user not found, eg. 'Invalid login credentials'. 
//                 message: "boo2"
//               })                            
//           }          
//         })
//       })

//     })
// }));




    //console.log("FindOne error, user", error, user)
    // if (error) {
    //   console.log(error)
    //   return done(error);
    // }
    // if (!user) {
    //   return done(null, false, {
    //     //message: "credentials-error" // Don't tell the user that an email/username does / doesn't exist.
    //     message: "boo"
    //   });                         
    // }                            
    // if (user) {
    //   console.log("passport.use user", user)
    //   return validateUserPassword(user.passwordHash, password)
    //     .then((validated) => {
    //       if (validated) {
    //         return done(user);
    //       } else {
    //         return done(null, false, {
    //           //message: "credentials-error" // Do not give password not found error. Give them the exact same message as for user not found, eg. 'Invalid login credentials'. 
    //           message: "boo2"
    //         })                            
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("error");
    //       console.log(error)
    //       return done(error)
    //     });
    // }
  //});
//}));

// function authenticate(email, password) {
//   try {
//     const user = await userService.FindOne(email);

//     if (!user) {
//       return null;
//     }

//     if (validateUserPassword(user.passwordHash, password)) {

//       // dates stored as a string in neo4j
//       user.registerDate = convertStringToDate(user.registerDate)
//       user.lastAccessDate = convertStringToDate(user.lastAccessDate)

//       return user;
//     }
//     else {
//       console.log("validateUserPassword failed ")
//       throw AuthorizationError;
//     }
//   }
//   catch(e) {
//     console.log("authetication error ", e)
//     throw e;
//   }
// }

// passport.use(new LocalStrategy ({ usernameField: 'email', session: false}, (username, password, done) => {
//   let method = (async () => {
//     try {
//       console.log("hip hip")
//       const user = await authenticate(email, password);
//     }
//     catch(err) {
//       done(err);
//     }

//     if (user) {
//       console.log("passes authenticate")
//       done(user);
//     }

//     done(null, false);
//   })

//   method.apply();
// }));


let authService = {
  Register: ({ email, displayName, password, role }, timeZone) => {
    const user = { email, displayName, password, role }

    return register(user)
      .then((emailVerificationObject) => {
        // send email
        const options = getRegisterMailOptions(emailVerificationObject, timeZone);

        return sendEmail(options)
          .then(email =>{
            return email;
          }) 
          .catch((error) => {
            console.log("Register Error: ", error)
            return error;
          }) 
      })
      .catch((error) => {
        console.log("Register Error: ", error)
        return error;
      })
  },

  VerifyEmailAddress: (email, emailVerificationString) => {
    return verifyEmailAddress(email, emailVerificationString)
      .then((verified) => {
        return verified;
      })
      .catch((error) => {
        console.log("Verify Email Error: ", error)
        return error;
      })
  },

  Login: ({ email, password, req }) => {
    return login({ email, password, req })
      .then((result) => {
        if (!result) {
          throw new Error ("credentials-error");
        }
        if (result) {
          return result;
        }
      })
      .catch((error) => {
        console.log('error logging in user');
        console.log(error);
        return error;
      })
  },

  GetUser: (email) => {
    return getUser(email)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log('error getting user');
        console.log(error);
        return error
      })
  },

  Activate2FactorAuthentication: (email) => {
    return activate2FactorAuthentication(email)
      .then((qrCode) => {
        return qrCode
      })
  },

  VerifyTwoFactorCode: (token, email) => {
    return verifyTwoFactorCode(token, email)
      .then((verified) => {
        return verified;
      })
  },

  SendPasswordReset: ({ email, timeZone }) => {
    return generatePasswordResetCode(email)
      .then(emailVerificationObject => {
        const options = getResetPasswordMailOptions(emailVerificationObject, timeZone);
        
        if (!options) { // email not found but dont tell user
          console.log("SendPasswordReset email not found")
          return email;
        }
        else {
          return sendEmail(options)
            .then(email =>{
              return email;
            }) 
            .catch((error) => {
              console.log("SendPasswordReset Error: ", error)
              throw new Error ("email-error");
            })   
        } 
      }) 
      .catch((error) => {
        console.log('Error Sending Reset Password');
        console.log(error);
        return error;
      })
  },

  CheckPasswordResetToken: ({token, email}) => {
    console.log("CheckPasswordResetToken")
    return checkPasswordResetToken(token, email)
      .then((result) => {
        return result
      })
  },

  ResetPassword: (email, password) => {
    return resetPassword(email, password)
      .then((resetUser) => {
        console.log(resetUser)
        return resetUser;
      })
  },

  ChangePassword: (email, password, token) => {
    CheckPasswordResetToken(token, email)
      .then((result) => {
        if (result.verified) {
          ResetPassword(email, password)
            .then((resetUser) => {
              if (!resetUser) {
                console.log('error resetting user password');
              } else {
                return resetUser
              }
            })
        }
      })
  },

  GetNewUser: () => {
    return getNewUser()
  }
}

export default authService

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
  return jwt.sign(user, 
      Config.jwt.secret,
      Config.jwt.options
  );
}

function register(userObject) {
  let promise = new Promise((resolve, reject) => {
    //let user = new User;
    let user = getNewUser()
    let emailVerificationString = crypto.randomBytes(32).toString('base64')

    user.email = userObject.email
    user.displayName = userObject.displayName
    user.role = userObject.role

    argon2.hash(userObject.password, {type: argon2.argon2id}).then((hash) => { // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
      user.passwordHash = hash;
      argon2.hash(emailVerificationString, {type: argon2.argon2id}).then((emailVerificationHash) => {
        user.emailVerificationHash = emailVerificationHash;
        //user.emailVerificationExpiry = new Date().valueOf() + (1000 * 60 * 60); // Expires in 1 hour. Make it a shorter time for production app.
        user.emailVerificationExpiry = getUTCFutureDate(1, "hours"); // Expires in 1 hour. Make it a shorter time for production app.
        //user.save((error) => {
        userService.CreateOne(user)  // will return an array with a single user
          .then((regUser, error) => {
            if (error) {
              console.log('error saving user')
              console.log(error)
              reject(error);
            }
            const { email, emailVerificationExpiry } = regUser[0]
            const emailVerificationObj = { email, emailVerificationString, emailVerificationExpiry }
            resolve(emailVerificationObj);
          })
          .catch((error) => {
            console.log('error creating user');
            console.log(error);
            reject(error);
          })
      })
    })
    .catch((error) => {
      console.log('error hashing user password');
      console.log(error);
      reject(error);
    })
  })
  return promise;
};

function verifyEmailAddress({email, emailVerificationString}) {
  let promise = new Promise((resolve, reject) => {
    userService.FindOne(email)
      .then((user) => {
        if (user) {
          if (user.verified) {
            resolve({verified: true, message: ''})
          }
          //if (user.emailVerificationExpiry > new Date().valueOf()) {
            if (isFirstUTCDateAfterSecond(user.emailVerificationExpiry, getUTCDate())) {
              argon2.verify(user.emailVerificationHash, emailVerificationString)
                .then((verified) => {
                  console.log('verified from argon2')
                  if (verified) {
                    user.emailVerificationExpiry = null;
                    user.emailVerificationHash = null;
                    user.verified = true;
                    user.registerDate = getUTCDate();

                    return userService.UpdateOne(user)
                      .then(user => {
                        resolve({verified: true, message: ""})
                      })
                      .catch((error) => {
                        console.log('error verifying email address');
                        console.log(error);
                        reject(error);
                      })   
                  } else {
                    resolve({verified: false, message: 'verifiy-email-error'})
                  }
                })
                .catch((error) => {
                console.log('error verifying email address');
                console.log(error);
                reject(error);
                })
            } else {
              resolve({verified: false, message: 'expired-email-token-error'})
            }
          }
        else {
          console.log("user not found")
          resolve({verified: false, message: 'verify-email-error'});
        }
    })
    .catch((error) => {
      console.log('error finding user');
      console.log(error);
      reject(error);
    })
  })
    return promise;
};

function login({ email, password, req }) {
  let promise = new Promise((resolve, reject) => {

    userService.FindOne(email)
      .then(user => {
        
        if (!user) {
          throw new Error("credentials-error")
        }

        validateUserPassword(user.passwordHash, password) 
          .then(validated => {
            if (!validated) {
              throw new Error("credentials-error")
            }

            user.lastAccessDate = getUTCDate()
            
            userService.UpdateOne(user) 
              .then(updUserArray => {

                let updUser = updUserArray[0]

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
                }

                const token = generateJwt(payload)

                req.res.cookie(Config.jwt.cookieName, token, Config.jwt.cookie)

                resolve(payload)
              }) 
            .catch(err => {
              console.log("UpdateOne error")
              reject(err)
            })
          })
        .catch(err => {
          console.log("FindOne error")
          reject(err)
        })
      })
    .catch(err => {
      console.log("FindOne error")
      reject(err)
    })
  })
  return promise;
}

function validateUserPassword(hash, password) {
  return argon2.verify(hash, password)
    .then((verified) => {
      if (verified) {
        return verified
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log('error')
      console.log(error)
      return error;
    })
};

function getUser(email) {
  //return User.findOne({email: email})
  return userService.FindOne({email: email})
    .then((user) => {
      if (!user) {
        return ({message: 'Error getting user'})
      } else {
        return user;
      }
    })
};

function activate2FactorAuthentication(email) {
  let promise = new Promise((resolve, reject) => {
    //User.findOne({email: email})
    userService.FindOne({email: email})
      .then((user) => {
        if (!user) {
          throw new Error('Error getting user')
        } else {
          let twoFactorSecret = speakeasy.generateSecret();
          let token = speakeasy.totp({
            secret: twoFactorSecret.base32,
            encoding: 'base32',
            algorithm: 'sha256'
          });
          user.tempTwoFactorSecret = twoFactorSecret;
          //user.save();
          userService.UpdateOne(user)
          qrCode.toDataURL(twoFactorSecret.otpauth_url, (error, dataUrl) => {
            if (error) {
              console.log('error creating qrcode');
              console.log(error);
            }
            resolve(dataUrl);
          });
        }
      });
  })
  return promise;
};

function verifyTwoFactorCode(token, email) {
  // return User.findOne({email: email})
  return userService.FindOne({email: email})
    .then((user) => {
      if (!user) {
        throw new Error('error getting user')
      } else {
        let verified = speakeasy.totp.verify({
          secret: user.tempTwoFactorSecret.base32,
          encoding: 'base32',
          token: token.toString()
        })
        if (verified === true) {
          user.twoFactorSecret = user.tempTwoFactorSecret;
          user.tempTwoFactorSecret = null;
          //user.save();
          userService.UpdateOne(user)
        }
        return {verified: verified, user: user}
      }
    })
}

function generatePasswordResetCode(email) {
  let promise = new Promise((resolve, reject) => {
    userService.FindOne(email)
      .then((user) => {
        if (!user) {
          console.log('reject')
          resolve();
        }
        else {
          let emailVerificationString = crypto.randomBytes(32).toString('base64')
          argon2.hash(emailVerificationString, {type: argon2.argon2id}).then((hash) => {
            user.passwordResetHash = hash;
            user.passwordResetExpiry = new Date().valueOf() + (1000 * 60 * 5) // 5 minutes

            userService.UpdateOne(user) 
              .then(updUserArray => {

              const { email, passwordResetExpiry } = updUserArray[0]
              const emailVerificationObj = { email, emailVerificationString, passwordResetExpiry }

              resolve(emailVerificationObj);
            })
            .catch((error) => {
              console.log('update rest hash error')
              console.log(error)
              reject(error);
            })
          })
        }
      })
      .catch(error => {
        console.log('generatePasswordResetCode find one error')
        console.log(error)
        reject(error);
      })
  })
  return promise;
}

function checkPasswordResetToken(code, email) {
  // return User.findOne({email: email})
  console.log("code, email", code, email)
  return userService.FindOne({email: email})
    .then((user) => {
      if (!user) {
        throw new Error('error getting user')
      } else {
        if (user.passwordResetExpiry > new Date().valueOf()) {
          return argon2.verify(user.passwordResetHash, code)
            .then((verified) => {
              let message = verified ? 'verify-token-succeeded' : 'verify-password-token-error'
              return ({verified, message})
            })
        } else {
          console.log('expired');
          return {verified: false, message:'reset-token-expired-error'}
        }
      }
    })
}

function resetPassword(email, password) {
  // return User.findOne({email: email})
  return userService.FindOne({email: email})
    .then((user) => {
      console.log('user')
      console.log(user)
      if (!user) {
        throw new Error('find-user-error')
      } else {
        return argon2.hash(password, {type: argon2.argon2id}).then((hash) => { // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
          user.passwordHash = hash;
          //user.save()
          userService.UpdateOne(user)
          return user;
        })
      }
    })
}

function getNewUser() {
  return {
    id: UUID.v4(),
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
  }
}

function getEmailVerificationObj(provider) {
  const { email, emailVerificationString, emailVerificationExpiry } = provider

  return {
    email: email,
    emailVerificationString: emailVerificationString,
    emailVerificationExpiry: emailVerificationExpiry,
  }
}

function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const smtpTransport = createTransporter()

    smtpTransport.sendMail(options, (err, resp) => {
      if (err) { reject(err) }
      if (resp) { 
        resolve(options.email)
      }
    })
  })
}


