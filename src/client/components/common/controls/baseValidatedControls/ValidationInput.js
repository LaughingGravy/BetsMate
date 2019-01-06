import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Label } from 'semantic-ui-react'

import ValidationErrorPopup from '../ValidationErrorPopup'

const ValidationInput = (props) => {
  let objs = []

  if (props.errors)
    objs = props.errors.objs

  let isError = false
  // let errMessages = ""
  let firstErrMessage = ""

  if (objs && objs.length > 0) {
    isError = true
    firstErrMessage = objs[0].msg
  }

  const shouldDisplayError = !props.pristine && isError 

  return (
    <React.Fragment>
      {!shouldDisplayError && <Form.Input {...props} />}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <Form.Input error {...props} icon>
          <input />
          <ValidationErrorPopup message={firstErrMessage} />
        </Form.Input>  
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>         
      <React.Fragment>
        <Form.Input error {...props} />
        <Label size="mini" basic color="red" basic pointing>{firstErrMessage}</Label>
        </React.Fragment>
      </Responsive>}
    </React.Fragment>
  )
}

ValidationInput.propTypes = {
  errors: PropTypes.shape({
    objs: PropTypes.arrayOf(PropTypes.shape({
      test: PropTypes.func.isRequired,
      msg: PropTypes.string.isRequired
    }))
  }),
  pristine: PropTypes.number.isRequired
}

export default ValidationInput


