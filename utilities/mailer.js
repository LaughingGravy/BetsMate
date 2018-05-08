const Config = require('../utilities/Config');
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

export default createTransporter;