import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Icon } from 'semantic-ui-react'

const ValidationInput = (props) => {
  const { errors } = props

  console.log("ValidationInput errors", errors)

  let isError = false
  let errMessages = ""
  let firstErrMessage = ""

  // if (!pristine && errors && errors.length > 0) {
  if ( errors && errors.length > 0) {
    isError = true
    firstErrMessage = errors[0].msg
 
    errors.map(error => {
        errMessages.concat(error.msg, "<br />")
    })

    errMessages = errMessages.substring(0, errMessage.length - "<br />".length)
  }

  const shouldDisplayError = isError 

 
 
  return (
    <React.Fragment>
       {!shouldDisplayError && <Form.Input {...props} />}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
      <Form.Input error {...props} action={<Popup
                                                  trigger={<Icon name="info circle" size="tiny" circular color="red" />}
                                                  content={errMessages}
                                                  on='hover' />} />
      </Responsive>}

      {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <React.Fragment>
          <Form.Input error {...props} />
          <Label size="mini" basic pointing>{firstErrMessage}</Label>
        </React.Fragment>
      </Responsive>}
    </React.Fragment>
  )
}

// ValidationInput.propTypes = {
//   validation: PropTypes.objectOf((PropTypes.shape({
//     pristine: PropTypes.bool.isRequired,
//     errors: PropTypes.objectOf(PropTypes.shape({
//       key: PropTypes.string.isRequired,
//       validationObjSet: PropTypes.arrayOf(PropTypes.shape({
//           test: PropTypes.func.isRequired,
//           msg: PropTypes.string.isRequired
//       })).isRequired
//     }))
//   })))
// }

export default ValidationInput


