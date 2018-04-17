const Config = require('../webpack/Config')
const nodemailer = require('nodemailer')

function createTransporter()
{
  return nodemailer.createTransport('SMTP', { 
    service: "Gmail",
    auth: {
      user: Config.mailerUser,
      pass: Config.mailerPassword
    }
  });
};

module.exports = createTransporter;