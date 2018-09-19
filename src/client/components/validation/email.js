import intl from 'react-intl-universal'

const validateEmail = (email) => {
  return {
    test: () => {
      var re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    msg: intl.get("email-validation-msg")
  }
}

export { validateEmail }