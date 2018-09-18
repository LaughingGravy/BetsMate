import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import '../styles/auth.css'

import { validateLogin } from '../authentication/login/validate'
import { shouldMarkError } from '../validation/common'

class AuthForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: "",
      pristine: {
        email: true,
        password: true
      }
    }
  }

  handleBlur = (name) => (e) => {
    this.setState({
      pristine: { ...this.state.pristine, [name]: false }
    })
  }

  handleChange = (e, { name, value }) => {
    this.setState({ 
      [name]: value
    })
  }

  render() {
    const { email, password, pristine } = this.state
    const errors = validateLogin(email, password)
    const isFormValid = !Object.keys(errors).some(x => errors[x])
    
    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} onBlur={this.handleBlur('email')}
                      className={shouldMarkError(errors['email'], pristine['email']) ? "error" : ""} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} onBlur={this.handleBlur('password')}
                      className={shouldMarkError(errors['password'], pristine['password']) ? "error" : ""} />
        </Form.Field>
       
        {this.props.render(...this.state, isFormValid)}
      </Form>
    )
  }
}

export default AuthForm