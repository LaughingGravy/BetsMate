import { getErrorsFromValidationObjs, required, minLength } from '../../validation/common'

const validateStadium= (stadiumName, city, countryId) => {
 const validationObjects = [
    {
      key: "stadiumName",
      validationObjectSet: [
        required(stadiumName),
        minLength(stadiumName, 2)
      ]
    },
    {
      key: "city",
      validationObjectSet: [
        required(city),
        minLength(city, 2)
      ]
    },
    {
      key: "countryId",
      validationObjectSet: [
        required(countryId),
        minLength(countryId, 50)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
}

export { validateStadium } 