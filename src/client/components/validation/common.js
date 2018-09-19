
const getErrorsFromValidationObjs = (validationObjects) => {
  const errors =[]

  validationObjects.map(obj => {
    if (!obj.test())
      errors.push({ key: obj.key, msg: obj.msg})
  })

  return errors
}

const minLength = (key, name, minlength) => {
  return [
      {
        key: key,
        test: () =>  { name.length >= minlength},
        msg: <pre>{intl.get("minlength-val-msg")} {minlength}</pre>
      }
    ]
}

export { shouldMarkError, getErrorsFromValidationObjs, minLength }