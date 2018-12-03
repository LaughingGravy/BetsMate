import { validateConfirmPassword } from '../../validation/password'
import { getErrorsFromValidationObjs, required, minLength } from '../../validation/common'

const validateChangePassword = (password, newpassword, newpasswordConfirm) => {
  const validationObjects = [
    {
      key: "password",
      validationObjectSet: [
        required(password),
        minLength(password, 8)
      ]
    },
    {
      key: "newpassword",
      validationObjectSet: [
        required(newpassword),
        minLength(newpassword, 8)
      ]
    },
    {
      key: "newpasswordConfirm",
      validationObjectSet: [
        validateConfirmPassword(newpassword, newpasswordConfirm)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateChangePassword }