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

export { getResetToken, getResetExpiry }