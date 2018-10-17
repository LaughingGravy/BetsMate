import { validateEmail } from '../../validation/email'
import { getErrorsFromValidationObjs, required, minLength } from '../../validation/common'

const validateLogin = (email, password) => {
  const validationObjects = [
    {
      key: "email",
      validationObjectSet: [
        required(email),
        validateEmail(email)
      ]
    },
    {
      key: "password",
      validationObjectSet: [
        required(password),
        minLength(password, 8)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateLogin }