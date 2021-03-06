import { validateConfirmPassword } from '../../validation/password'
import { getErrorsFromValidationObjs, required, minLength } from '../../validation/common'

const validateResetChangePassword = (newpassword, newpasswordConfirm) => {
  const validationObjects = [
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

export { validateResetChangePassword }
