import UUID from 'node-uuid'
import moment from 'moment'
import tz from 'moment-timezone'

import Config from '../../../utilities/Config'

const getResetToken = () => {
  return UUID.v4()
}

const getUTCResetExpiry = () => {
  return moment().utc().add(Config.resetTokenExpiryInDays, "d").toDate()
}

const convertUTCToTimeZone = (utcDate, timeZone) => {
 return moment(utcDate).utc().tz(timeZone).toDate()
}

const hasResetLinkExpired = (linkDate) => {
  return moment(linkDate).utc().isBefore(moment().utc())
}

const getResetMailOptions = ({ email, token, expiry }, timeZone) => {
  const localDate = moment(convertUTCToTimeZone(expiry, timeZone )).format("dddd MMMM YYYY h:mm:ss a")

  return {
          from: Config.mailerUser,
          to: email,
          subject: "Bets Mate Password Reset",
          html: `<h1> Greetings ${email}</h1>` +
                  "<p>Here is the link to reset your password.<p>" +
                  `<p>The link is valid until ${localDate}</p>` +
                  `<p><a href=http://localhost:3000/resetchange/${token}>Click here</p>`
          }
}

export { getResetToken, getUTCResetExpiry, hasResetLinkExpired, convertUTCToTimeZone, getResetMailOptions }