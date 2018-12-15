const Config = require('../utilities/Config');
const nodemailer = require('nodemailer')
//const xoauth2 = require('xoauth2');

let mailService = {
  CreateTransporter: () => {
    return nodemailer.createTransport({ 
      host: "smtp.gmail.com",
      auth: {
          type: "login",
          user: "baikinmanlovesdokinchan@gmail.com", //Config.mailerUser,
          pass: "k0mbanwa" //Config.mailerPassword
      }
    });
  }
};

export default mailService;

// var email_smtp = nodemailer.createTransport({      
//   host: "smtp.gmail.com",
//   auth: {
//     type: "OAuth2",
//     user: "youremail@gmail.com",
//     clientId: "CLIENT_ID_HERE",
//     clientSecret: "CLIENT_SECRET_HERE",
//     refreshToken: "REFRESH_TOKEN_HERE"                              
//   }
// });
// https://nodemailer.com/smtp/oauth2/