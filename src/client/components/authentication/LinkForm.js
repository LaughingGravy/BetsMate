import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import '../styles/auth.css'

import { validateEmail } from '../validation/email'
import { shouldMarkError } from '../validation/common'

class ResetForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pristine: {
        email: true
      }
    }
  }

  handleBlur = (name) => (e) => {
    this.setState({
      pristine: { ...this.state.pristine, [name]: false }
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { email } = this.state
    const error = validateEmail(email)
    const isFormValid = !error

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} onBlur={this.handleBlur('email')}
                      className={shouldMarkError(errors['email'], pristine['email']) ? "error" : ""} />
        </Form.Field>
       
        {this.props.render(this.state)}
      </Form>
    )
  }
}

export default ResetForm