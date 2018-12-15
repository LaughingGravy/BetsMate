import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import '../styles/style.css'

import { validateLinkForm } from './sendPasswordReset/validate'
import { getErrObjs } from '../validation/common'

class ResetForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pristineFields: {
        email: true
      }
    }
  }

  handleBlur = (name) => (e) => {
    this.setState({
      pristineFields: { ...this.state.pristineFields, [name]: false }
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { email, timeZone, pristineFields } = this.state
    const errors = validateLinkForm(email)
    const emailErrObjs = getErrObjs(errors, "email")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} onBlur={this.handleBlur('email')}
                      errors={emailErrObjs} pristine={pristineFields['email'] ? 1 : 0} />
        </Form.Field>
       
        {this.props.render({ variables: { email, timeZone }, isFormValid: isFormValid })}
      </Form>
    )
  }
}

export default ResetForm