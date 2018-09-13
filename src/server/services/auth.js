const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');
const UserReset = mongoose.model('userReset');
const UserRegister = mongoose.model('userRegister');

import createTransporter from '../../../utilities/mailer'
import { getUTCDate, getToken, getResetMailOptions, getUTCTokenExpiry, hasLinkExpired, getRegisterMailOptions } from './authHelper'

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {

    if (err) { return done(err); }
    if (!user) { return done(null, false, "credentials-error"); }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, "pwd-invalid-error");
    });
  });
}));

// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
function signup({ token, displayName, password, role, req }) {
  const user = new User({ displayName, password, role });
  
  if (!displayName || !password) { throw new Error("missing-reg-details-error"); }

  return UserRegister.findOne({ token })
    .then(existingUserRegister => {
      if (!existingUserRegister) { throw new Error("reg-token-not-found-error"); }
      user.email = existingUserRegister.email

      const { email } = user

      User.findOne({email})
        .then(existingUser => {
          if (existingUser) { throw new Error("duplicate-email-error"); }  
        })

        User.findOne({email})
          .then(existingUser => {
            if (existingUser) { throw new Error("duplicate-email-error"); }  
          })
    })
    .then(() => {
      return User.findOne({ displayName })
        .then(existingUser => {
          if (existingUser) { throw new Error("duplicate-username-error"); }
            return user.save();
        })
        .then(user => {
          return new Promise((resolve, reject) => {
            req.login(user, (err) => {
              if (err) { reject(err); }
                resolve(user);
            });
        });
    })
  })
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its intended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject("credentials-error") }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

function changePassword({ email, password, req }, newPassword) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject("credentials-error") }

      user.updateOne({ "email": email.toLowerCase() },
                      { $set: { "password": newPassword }},
                      { upsert: false })


      req.login(user, () => resolve(user));
    })({ body: { user: { email, password } } });
  })
}

function registerLink({ email, timeZone }) {
  const token = getToken()
  const expiry = getUTCTokenExpiry()

  const userRegister = { email, token, expiry }

  return User.findOne({email})
    .then(existingUser => {
      if (existingUser) { throw new Error("duplicate-email-error"); }

        UserRegister.updateOne({ "email": userRegister.email.toLowerCase() },
                            { $set: { "token": userRegister.token, "expiry": userRegister.expiry }},
                            { upsert: true }, (err) => {
            if (err) { throw(err); }
        })
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        const smtpTransport = createTransporter()
        const options = getRegisterMailOptions(userRegister, timeZone)

        smtpTransport.sendMail(options, (err, resp) => {
          if (err) { reject(err) }
          if (resp) { 
            resolve(userRegister)
          }
        })
    })
  })
}

function resetLink({ email, timeZone }) {
  const token = getToken()
  const expiry = getUTCTokenExpiry()

  const userReset = { email, token, expiry }

  return User.findOne({email})
    .then(existingUser => {
      if (!existingUser) { throw new Error("email-not-reg-error"); }

        UserReset.updateOne({ "email": userReset.email.toLowerCase() },
                            { $set: { "token": userReset.token, "expiry": userReset.expiry }},
                            { upsert: true }, (err) => {
            if (err) { throw(err); }
        })
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        const smtpTransport = createTransporter()
        const options = getResetMailOptions(userReset, timeZone)

        smtpTransport.sendMail(options, (err, resp) => {
          if (err) { reject(err) }
          if (resp) { 
            resolve(userReset)
          }
        })
    })
  })
}

function resetPassword({ token, password }) {
  return UserReset.findOne({token})
    .then(existingUserReset => {
      if (!existingUserReset) { 
        throw new Error("reset-token-not-found-error"); 
      }

      if (hasLinkExpired(existingUserReset.expiry)) { 
        throw new Error("reset-token-expired-error"); 
      }

      return new Promise((resolve, reject) => {
        const { email } = existingUserReset
        
        User.findOne({ email })
          .then(existingUser => {
            if (!existingUser) { reject(new Error("email-not-found-error")) }
            existingUser.password = password 
            existingUser.save()
          })
          .then(() => {
            existingUserReset.remove()
          })
          .then(() => {
            resolve(existingUserReset)
          })
      })      
    })
}

export { signup, login, resetLink, resetPassword, changePassword, registerLink }