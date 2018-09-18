import { validateEmail } from '../../validation/email'
import { validateConfirmPassword } from '../../validation/password'
import { getErrorsFromValidationObjs, minLength } from '../../validation/common'

const validateRegister = (email, displayName, password, passwordConfirm) => {
  const validationObjects = [
    validateEmail(email),
    minLength("password", password, 8),
    minLength("displayName", displayName, 5),
    validateConfirmPassword(passwordConfirm)
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateRegister }