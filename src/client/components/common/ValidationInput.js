import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Icon } from 'semantic-ui-react'

const ValidationInput = (props) => {
  const { errors, isPristine } = props

  const isError = false
  const errMessages = ""
  const firstErrMessage = ""

  const failedValidation =  errors.filter(error => { error.test() })

  if (failedValidation.length > 0) {
    isError = true
    firstErrMessage = failedValidation[0].msg
 
    failedValidation.map(error => {
        errMessages.concat(error.msg, "<br />")
    })

    errMessages = errMessages.substring(0, errMessage.length - "<br />".length)
  }

  const shouldDisplayError = isError && !isPristine
 
  return (
    <React.Fragment>
       {!shouldDisplayError && <Form.Input {...props} />}

      {shouldDisplayError && <Responsive minWidth={...Responsive.onlyComputer.minWidth}>
      <Form.Input error {...props} action={<Popup
                                                              trigger={<Icon name="info circle" size="tiny" circular color="red" />}
                                                              content={errMessages}
                                                              on='hover' />} />
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={...Responsive.onlyTablet.maxWidth}>
        <React.Fragment>
          <Form.Input error {...props} />
          <Label size="mini" basic pointing>{firstErrMessage}</Label>
        </React.Fragment>
      </Responsive>}
    </React.Fragment>
  )
}

ValidationInput.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    test: PropTypes.func.isRequired,
    msg: PropTypes.string.isRequired
  })),
  isPristine: PropTypes.bool.isRequired
}

export default ValidationInput