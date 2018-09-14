import UUID from 'node-uuid'
import moment from 'moment'
import tz from 'moment-timezone'

import Config from '../../../utilities/Config'

const getToken = () => {
  return UUID.v4()
}

const getUTCDate = () => {
  return moment().utc().toDate()
}

const getUTCFutureDate = (duration, key) => {
  return moment().utc().add(duration, key).toDate()
}

const getFutureDate = (duration, key) => {
  return moment().add(duration, key).toDate()
}

const convertUTCToTimeZone = (utcDate, timeZone) => {
 return moment(utcDate).utc().tz(timeZone).toDate()
}

const hasLinkExpired = (linkDate) => {
  return moment(linkDate).utc().isBefore(moment().utc())
}

const getResetMailOptions = ({ email, token, expiry }, timeZone) => {
  const localDate = moment(convertUTCToTimeZone(expiry, timeZone )).format("dddd MMMM YYYY h:mm:ss a")

  return {
          from: Config.mailerReply,
          to: email,
          subject: "Bets Mate Password Reset",
          html: `<h1> Greetings ${email}</h1>` +
                  "<p>Here is the link to reset your password.<p>" +
                  `<p>The link is valid until ${localDate}</p>` +
                  `<p><a href=http://localhost:3000/reset/${token}>Click here</p>`
          }
}

const getRegisterMailOptions = ({ email, token, expiry }, timeZone) => {
  const localDate = moment(convertUTCToTimeZone(expiry, timeZone )).format("dddd MMMM YYYY h:mm:ss a")

  return {
          from: Config.mailerReply,
          to: email,
          subject: "Bets Mate Registration Activation",
          html: `<h1> Greetings ${email}</h1>` +
                  "<p>Below is the link to activate your registration with Bets Mate.<p>" +
                  `<p>The link is valid until ${localDate}</p>` +
                  `You will be prompted to enter a password to complete the registration process`+
                  `<p><a href=http://localhost:3000/register/${token}>Click here</p>`
          }
}

export { getToken, getUTCDate, getFutureDate, hasLinkExpired, convertUTCToTimeZone, 
          getResetMailOptions, getRegisterMailOptions }