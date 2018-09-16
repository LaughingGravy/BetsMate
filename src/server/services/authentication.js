const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
//const config = require('../config/config');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');
const speakeasy = require('speakeasy');
const qrCode = require('qrcode');

import userService from './user'
import Config from '../../../utilities/Config'
import { getFutureDate } from './authHelper'

passport.use(new LocalStrategy ({usernameField: 'email'}, (username, password, done) => {
  return userService.findOne({email: username}, (error, user) => {
    if (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false, {
        message: "credentials-error" // Don't tell the user that an email/username does / doesn't exist.
      });                         
    }                            
    if (user) {
      return validateUserPassword(user.passwordHash, password)
        .then((validated) => {
          if (validated) {
            return done(user);
          } else {
            return done(null, false, {
              message: "credentials-error" // Do not give password not found error. Give them the exact same message as for user not found, eg. 'Invalid login credentials'. 
            })                            
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error)
          return done(error)
        });
    }
  });
}));

let authService = {
  RegisterUser: (user, timeZone) => {
    return registerUser(user)
      .then((emailVerificationObject) => {
        //return emailVerificationObject;
        // send email
        const options = getRegisterMailOptions(emailVerificationObject, timeZone)
        return sendEmail(options)       
      })
      .catch((error) => {
        return error;
      })
  },

  VerifyEmailAddress: (email, emailVerificationString) => {
    return verifyEmailAddress(email, emailVerificationString)
      .then((verified) => {
        return verified;
      });
  },

  LoginUser: ({ email, password, req }) => {
    return loginUser({ email, password, req })
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
  }





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

  SendPasswordResetEmail: (email) => {
    return generatePasswordResetCode(email)
      .then((code) => {
        console.log('code');
        console.log(code);
        return code;
      })
  },

  CheckPasswordResetCode: (code, email) => {
    return checkPasswordResetCode(code, email)
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

  GetNewUser: () =>{
    return getNewUser()
  }
}

export default authService

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

function generateJwt(user) {
  return jwt.sign({
   // _id: user._id,
    email: user.email,
    exp: new Date().valueOf() + (1000 * 60 * 60 * 6) // 6 hours
  }, Config.secret);
}

function registerUser(userObject) {
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
        user.emailVerificationExpiry = new Date().valueOf() + (1000 * 60 * 60); // Expires in 1 hour. Make it a shorter time for production app.
        //user.save((error) => {
        userService.createOne((error) => {
          if (error) {
            console.log('error saving user')
            console.log(error)
            reject(error);
          }
          resolve({emailAddress: user.email, emailVerificationString: emailVerificationString, emailVerificationExpiry: emailVerificationExpiry});
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

function verifyEmailAddress(email, emailVerificationString) {
  return userService.getOne({email: email})
    .then((user) => {
      if (user) {
        if (user.emailVerificationExpiry > new Date().valueOf()) {
          return argon2.verify(user.emailVerificationHash, emailVerificationString)
            .then((verified) => {
              console.log('verified from argon2')
              console.log(verified)
              if (verified) {
                user.emailVerificationExpiry = null;
                user.emailVerificationHash = null;
                user.verified = true;
                user.registrationDate = new Date()
                //user.save();
                userService.updateOne(user)
                return verified
              } else {
                return 'error verifying email address'
              }

            })
            .catch((error) => {
              console.log('error verifying email address');
              console.log(error);
              return error
            })
        } else {
          return 'Verification token has expired.';
        }
      } else {
        return 'Error verifiying email address';
      }
    });
};

function loginUser({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject("credentials-error") }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

function loginUser({ email, password, req }) {
  let promise = new Promise((resolve, reject) => {
    passport.authenticate('local', (user, error, info) => {
      if (error) {
        console.log('error authenticating user');
        console.log(error);
        reject(error)
      }
      if (info) {
        console.log('info from authenticate user');
        console.log(info)
        reject(info)
      }
      if (user) {
        if (user.verified === true) {
          let token = generateJwt(user);
          resolve({user: user, token: token})
        } else {
          reject(new Error("email-not-verified-error"))
        }
      }
    })(req, res);
  });
  return promise;
};

function getUser(email) {
  //return User.findOne({email: email})
  return userService.findOne({email: email})
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
    userService.findOne({email: email})
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
          userService.updateOne(user)
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
  return userService.findOne({email: email})
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
          userService.updateOne(user)
        }
        return {verified: verified, user: user}
      }
    })
}

function generatePasswordResetCode(email) {
  //return User.findOne({email: email})
  return userService.findOne({email: email})
    .then((user) => {
      if (!user) {
        throw new Error('error getting user')
      } else {
        let code = crypto.randomBytes(32).toString('base64')
        return argon2.hash(code, {type: argon2.argon2id}).then((hash) => {
          user.passwordResetHash = hash;
          user.passwordResetExpiry = new Date().valueOf() + (1000 * 60 * 5) // 5 minutes
          //user.save();
          userService.updateOne(user)
          return code;
        })
      }
    })
}

function checkPasswordResetCode(code, email) {
  // return User.findOne({email: email})
  return userService.findOne({email: email})
    .then((user) => {
      if (!user) {
        throw new Error('error getting user')
      } else {
        if (user.passwordResetExpiry > new Date().valueOf()) {
          return argon2.verify(user.passwordResetHash, code)
            .then((verified) => {
              let info = verified ? 'All good in the good' : 'Nice try, but no banana.'
              return ({verified, info})
            })
        } else {
          console.log('expired');
          return ({verified: false, info: 'Your reset code has expired. Please request another and be faster next time.'})
        }
      }
    })
}

function resetPassword(email, password) {
  // return User.findOne({email: email})
  return userService.findOne({email: email})
    .then((user) => {
      console.log('user')
      console.log(user)
      if (!user) {
        throw new Error('error getting user')
      } else {
        return argon2.hash(password, {type: argon2.argon2id}).then((hash) => { // Hash the password with Argon2id: https://crypto.stackexchange.com/questions/48935/why-use-argon2i-or-argon2d-if-argon2id-exists?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
          user.passwordHash = hash;
          //user.save()
          userService.updateOne(user)
          return user;
        })
      }
    })
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
  }
}

function sendEmail(options) {
  return new Promise((resolve, reject) => {
    const smtpTransport = createTransporter()

    smtpTransport.sendMail(options, (err, resp) => {
      if (err) { reject(err) }
      if (resp) { 
        resolve(options.emailAddress)
      }
    })
  })
}


