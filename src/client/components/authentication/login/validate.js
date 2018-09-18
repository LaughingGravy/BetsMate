import { validateEmail } from '../../validation/email'
import { getErrorsFromValidationObjs } from '../../validation/common'

const validateLogin = (email, password) => {
  const validationObjects = [
    validateEmail(email),
    minLength("password", password, 8),
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateLogin }