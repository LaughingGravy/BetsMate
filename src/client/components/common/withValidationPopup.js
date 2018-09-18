import React from 'react'

import { shouldMarkError } from '../validation/common'
import '../styles/auth.css'

const withValidationPopUp = (WrappedComponent) => (props) => {
  const { errors, isPristine } = props
  const errMessage = ""
 

  errors.map(error => {
    if (error.test())
      errMessage.concat(error.msg, "<br />")
  })

  errMessage = errMessage.substring(0, errMessage.length - "<br />".length)

  return (
    <Popup
            trigger={<WrappedComponent className={shouldMarkError(errors, isPristine) ? "error" : ""} />}
            content={errMessage}
            on='hover' />
  )
}

export { withValidationPopUp } 