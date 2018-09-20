import intl from 'react-intl-universal'

const validateEmail = (email) => {
  const obj = {
    test: () => {
      var re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    msg: intl.get("email-format-val-msg")
  }

  return obj
}

export { validateEmail }