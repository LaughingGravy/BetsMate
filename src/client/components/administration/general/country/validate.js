import { getErrorsFromValidationObjs, required, minLength } from '../../../validation/common'

const validateCountry= (code, countryName) => {
 const validationObjects = [
    {
      key: "code",
      validationObjectSet: [
        required(code),
        minLength(code, 2)
      ]
    },
    {
      key: "countryName",
      validationObjectSet: [
        required(countryName),
        minLength(countryName, 2)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateCountry } 