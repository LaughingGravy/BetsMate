import React from 'react'
import intl from 'react-intl-universal'

const validateConfirmPassword = (password, confirmPassword) => {
  const obj =
      {
        test: () => { return password === confirmPassword  ? true : false },
        msg: intl.get("confirm-password-val-msg")
      }

  return obj
}

export { validateConfirmPassword }
