import React from 'react'
import intl from 'react-intl-universal'

const getErrorsFromValidationObjs = (validationObjects) => {
  const errors =[]

  validationObjects.map(fieldSet => {
    const key = fieldSet.key
    const erroredValidationObjSet = []

    fieldSet.validationObjectSet.map(obj =>{
      if (!obj.test()) {
        erroredValidationObjSet.push(obj)
      }
    })

    if (erroredValidationObjSet.length > 0) {
      errors.push({ key: key, validationObjSet: erroredValidationObjSet })
    }
  })

  return errors
}

const minLength = (name, minlength) => {
  const obj =
      {
        test: () =>  { name.length >= minlength},
        msg: `<pre>${intl.get("minlength-val-msg")} ${minlength}</pre>`
      }
  return obj
}

const required = (name) => {
  const obj =  
  {
    test: () =>  { name && name.length > 0},
    msg: `<span>${intl.get("required-val-msg")}</span>`
  }

  return obj
}

export { getErrorsFromValidationObjs, minLength, required }