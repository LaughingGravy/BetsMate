import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, Form, Icon, Popup, Label, Button } from 'semantic-ui-react'
import { renderComponent } from 'recompose';

const ErrPopup = (messages) => (
  <Popup
    trigger={<Icon name="info" color="red" size="small" />}
    content={messages} position="right center" on="hover" open={true}
  />
)

const ValidationInput = (props) => {
  let objs = []

  if (props.errors)
    objs = props.errors.objs

  let isError = false
  let errMessages = ""
  let firstErrMessage = ""

  if ( objs && objs.length > 0) {
    isError = true
    firstErrMessage = objs[0].msg

    objs.map(error => {
      errMessages = errMessages.concat(error.msg, "<br />")
    })

    errMessages = errMessages.substring(0, errMessages.length - "<br />".length)
  }

  const shouldDisplayError = isError 

  console.log("errMessages", errMessages)

  return (
    <React.Fragment>
      {!shouldDisplayError && <Form.Input {...props} />}

      {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
      
      <Form.Input error {...props}>
        <input />

        <Popup
          trigger={<Icon name='info' color='red' />}
          content={errMessages} on="hover"
          position='top left' />
          
      </Form.Input>
        
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

// class ValidationInput extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   const objs = []

//   if (props.errors)
//     objs = props.errors.objs

//   let isError = false
//   let errMessages = ""
//   let firstErrMessage = ""

//   // if (!pristine && errors && errors.length > 0) {
//   if ( objs && objs.length > 0) {
//     isError = true
//     firstErrMessage = objs[0].msg
 
//     objs.map(error => {
//         errMessages.concat(error.msg, "<br />")
//     })

//     errMessages = errMessages.substring(0, errMessages.length - "<br />".length)
//   }



//   const shouldDisplayError = isError 
  
//   render() {

//     return (
//       <React.Fragment>
//         {!shouldDisplayError && <Form.Input {...props} />}

//         {/* {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
//         <Form.Input error {...props} action={<Popup
//                                                     trigger={<Icon name="info" size="large" color="red" />}
//                                                     content={errMessages}
//                                                     on='hover' />} />
//         </Responsive>} */}

//         {shouldDisplayError && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        
//         <Form.Input error {...props} icon={ErrorIcon} action={ErrorPopup} />
        
//         </Responsive>}

//         {shouldDisplayError && <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
//           <React.Fragment>
//             <Form.Input error {...props} />
//             <Label size="mini" basic pointing>{firstErrMessage}</Label>
//           </React.Fragment>
//         </Responsive>}
//       </React.Fragment>
//     )
//   }
// }

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


