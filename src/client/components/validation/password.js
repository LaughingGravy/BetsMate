import React from 'react'
import intl from 'react-intl-universal'

const validateConfirmPassword = (password, confirmPassword) => {
  const obj =
      {
        test: () => { password === confirmPassword },
        msg: `<span>${intl.get("confirm-password-val-msg")}</span>`
      }

  return obj
}

export { validateConfirmPassword }
