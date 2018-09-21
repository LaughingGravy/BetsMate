import { validateEmail } from '../../validation/email'
import { validateConfirmPassword } from '../../validation/password'
import { getErrorsFromValidationObjs, minLength, required } from '../../validation/common'

const validateRegister = (email, displayName, password, passwordConfirm) => {
  const validationObjects = [
    {
      key: "email",
      validationObjectSet: [
        required(email),
        validateEmail(email)
      ]
    },
    {
      key: "displayName",
      validationObjectSet: [
        minLength(displayName, 5),
      ]
    },
    {
      key: "password",
      validationObjectSet: [
        required(password),
        minLength(password, 8)
      ]
    },
    {
      key: "passwordConfirm",
      validationObjectSet: [
        validateConfirmPassword(password, passwordConfirm)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateRegister }