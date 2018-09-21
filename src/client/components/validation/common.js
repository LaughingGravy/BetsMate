
import intl from 'react-intl-universal'

const getErrorsFromValidationObjs = (validationObjects) => {
  const errors =[]

  validationObjects.map(fieldSet => {

    let erroredfieldSet = { key: fieldSet.key, objs: []}

    fieldSet.validationObjectSet.map(obj =>{
      if (!obj.test()) {
        erroredfieldSet.objs.push(obj)
      }
    })

    if (erroredfieldSet.objs.length > 0) {
      errors.push(erroredfieldSet)
    }
  })

  return errors
}

const minLength = (name, minlength) => {
  const obj =
      {
        test: () =>  { return name.length >= minlength },
        msg: `${intl.get("minlength-val-msg")} ${minlength}`
      }
  return obj
}

const required = (name) => {
  const obj = 
  {
    test: () =>  { return name.length > 0},
    msg: `${intl.get("required-val-msg")}`
  }

  return obj;
}

export { getErrorsFromValidationObjs, minLength, required }