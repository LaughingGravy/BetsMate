import React from 'react'
import intl from 'react-intl-universal'

const validateConfirmPassword = (password, confirmPassword) => {
  return [
      {
        test: () => { password === confirmPassword },
        msg: <span>{intl.get("confirm-password-val-msg")}</span>
      }
    ]
}

export { validatePassword, validateConfirmPassword }
