import UUID from 'node-uuid'
import  { addDays } from 'date-fns'

import { getUTCDate } from '../../../utilities/dates'
import Config from '../../../utilities/Config'


const getResetToken = () => {
  return UUID.v4()
}

const getResetExpiry = () => {
  return addDays(getUTCDate(), Config.resetTokenExpiryInDays)
}

const getResetMailOptions = ({ email, token, expiry }) => {
  return {
          from: Config.mailerUser,
          to: email,
          subject: "Bets Mate Password Reset",
          html: `<h1> Greetings ${email}</h1>` +
                  "<p>Here is the link to reset your password.<p>" +
                  `<p>The link is valid until ${expiry}</p>` +
                  `<p><a href=http://localhost:3000/resetchange/${token}>Click here</p>`
          }
}

export { getResetToken, getResetExpiry, getResetMailOptions }