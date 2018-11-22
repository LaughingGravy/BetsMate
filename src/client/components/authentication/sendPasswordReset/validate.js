import { validateEmail } from '../../validation/email'
import { getErrorsFromValidationObjs, required } from '../../validation/common'

const validateLinkForm = (email) => {
  const validationObjects = [
    {
      key: "email",
      validationObjectSet: [
        required(email),
        validateEmail(email)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateLinkForm }