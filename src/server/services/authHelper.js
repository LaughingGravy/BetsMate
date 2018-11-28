
import moment, { ISO_8601 } from 'moment'
import { tz } from 'moment-timezone'

import Config from '../../../utilities/Config'
import { getServerURL } from '../../../utilities/env'

const isFirstUTCDateAfterSecond = (date1, date2) => {
  const utcDate1 = moment(date1).utc()
  const utcDate2 = moment(date2).utc()

  return utcDate1.isAfter(utcDate2)
}

const convertStringToDate = (input) => {
  try {
    return moment(input).toDate();
  }
  catch(e) {
    console.log("convertStringToDate error", e)
    return null;
  }
}

const getUTCDate = () => {
  return moment().utc().toDate()
}

const convertToUTCDate = (date) => {
  return moment(date).utc().format();
}

const getUTCFutureDate = (duration, key) => {
  return moment().utc().add(duration, key).toDate()
}

const getFutureDate = (duration, key) => {
  return moment().add(duration, key).toDate()
}

const convertUTCToTimeZone = (utcDate, timeZone) => {
  //let usersDate = moment(utcDate, "dddd MMMM YYYY h:mm:ss a").tz(timeZone);
  //return usersDate.format("dddd MMMM YYYY h:mm:ss a");
  return moment(utcDate).tz(timeZone).toDate();
}

const hasLinkExpired = (linkDate) => {
  return moment(linkDate).utc().isBefore(moment().utc());
}

// const getResetMailOptions = ({ email, token, expiry }, timeZone) => {
//   const localDate = moment(convertUTCToTimeZone(expiry, timeZone )).format("dddd MMMM YYYY h:mm:ss a")

//   return {
//           from: Config.mailerReply,
//           to: email,
//           subject: "Bets Mate Password Reset",
//           html: `<h1> Greetings ${email}</h1>` +
//                   "<p>Here is the link to reset your password.<p>" +
//                   `<p>The link is valid until ${localDate}</p>` +
//                   `<p><a href=http://localhost:3000/reset/${token}>Click here</p>`
//           }
// }

// const getRegisterMailOptions = ({ email, token, expiry }, timeZone) => {
//   const localDate = moment(convertUTCToTimeZone(expiry, timeZone )).format("dddd MMMM YYYY h:mm:ss a")

//   return {
//           from: Config.mailerReply,
//           to: email,
//           subject: "Bets Mate Registration Activation",
//           html: `<h1> Greetings ${email}</h1>` +
//                   "<p>Below is the link to activate your registration with Bets Mate.<p>" +
//                   `<p>The link is valid until ${localDate}</p>` +
//                   `You will be prompted to enter a password to complete the registration process`+
//                   `<p><a href=http://localhost:3000/register/${token}>Click here</p>`
//           }
// }

const getRegisterMailOptions = (emailVerificationObject, timeZone) => {
  const { email, emailVerificationString, emailVerificationExpiry } = emailVerificationObject

  const localDate = convertUTCToTimeZone(emailVerificationExpiry, timeZone)
  
  let options = {
                    from: Config.mailerReply,
                    to: email,
                    subject: "Bets Mate Registration",
                    html: `<h1> Greetings</h1>` +
                            "Thanks for registering with Bets Mate" +
                            "<p>Please follow this link to confirm your email address and activate your account.<p>" +
                            `<p>The link is valid until ${localDate}</p>` +
                            `<p><a href=${getServerURL()}/verify-email/${email}/${encodeURIComponent(emailVerificationString)}>Click here</p>`
                    }
  return options;
}

const getResetPasswordMailOptions = (passwordResetObject, timeZone) => {
  const { email, passwordResetString, passwordResetExpiry } = passwordResetObject

  const localDate = convertUTCToTimeZone(passwordResetExpiry, timeZone)

  return {
          from: Config.mailerReply,
          to: email,
          subject: "Bets Mate Password Reset",
          html: `<h1>Greetings</h1>` +
                  "<p>Here is the link to reset your password.<p>" +
                  `<p>The link is valid until ${localDate}</p>` +
                  `<p><a href=${getServerURL()}/verify-reset-password/${email}/${encodeURIComponent(passwordResetString)}>Click here</p>`
          }
}

export { getToken, getUTCDate, getFutureDate, getUTCFutureDate, convertToUTCDate, isFirstUTCDateAfterSecond, hasLinkExpired, convertUTCToTimeZone, convertStringToDate,
          getResetMailOptions, getRegisterMailOptions, getResetPasswordMailOptions }