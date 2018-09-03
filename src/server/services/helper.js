import UUID from 'node-uuid'
import  { addDays } from 'date-fns/utc/addDays'

import Config from '../../../utilities/Config'

function getResetToken() {
  return UUID.v4()
}

function getResetExpiry() {
  return addDays(new Date(), Config.resetTokenExpiryInDays)
}

export { getResetToken, getResetExpiry }