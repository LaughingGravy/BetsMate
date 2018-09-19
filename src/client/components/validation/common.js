
const getErrorsFromValidationObjs = (validationObjects) => {
  const errors =[]

  validationObjects.map(objSet => {
    const key = objSet.key
    const erroredValidationObjSet = []

    objSet.map(obj =>{
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
  return [
      {
        key: "minLength",
        test: () =>  { name.length >= minlength},
        msg: <pre>{intl.get("minlength-val-msg")} {minlength}</pre>
      }
    ]
}

const required = (name) => {
  return [
      {
        key: "required",
        test: () =>  { name.length > 0},
        msg: <span>{intl.get("required-val-msg")}</span>
      }
    ]
}

export { getErrorsFromValidationObjs, minLength, required }