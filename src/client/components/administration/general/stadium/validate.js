import { getErrorsFromValidationObjs, required, minLength } from '../../../validation/common'

const validateStadium= (stadiumName, city, country) => {

  console.log("validateStadium country", country)
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
      key: "country",
      validationObjectSet: [
        required(country.name)
      ]
    }
  ]

  return getErrorsFromValidationObjs(validationObjects)
} 

export { validateStadium } 