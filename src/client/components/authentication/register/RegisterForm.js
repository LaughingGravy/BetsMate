import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import '../../styles/auth.css'

import { validateRegister } from './validate'

class RegisterForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      displayName: "",
      password: "",
      passwordConfirm: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pristine: {
        displayName: true,
        password: true,
        passwordConfirm: true,
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
    const { displayName, password, passwordConfirm, timeZone, pristine } = this.state
    const errors = validateRegister(email, displayName, password, passwordConfirm)
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>  
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} onBlur={this.handleBlur('email')} />
                      // className={shouldMarkError(errors['email'], pristine['email']) ? "error" : ""} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='displayName' type='text' label={intl.get("username-label")} placeholder={intl.get("username-placeholder")}
                      value={displayName} onChange={this.handleChange} onBlur={this.handleBlur('displayName')} />
                      {/* className={shouldMarkError(errors['displayName'], pristine['displayName']) ? "error" : ""} /> */}
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} onBlur={this.handleBlur('password')} />
                      {/* className={shouldMarkError(errors['password'], pristine['password']) ? "error" : ""} /> */}
        </Form.Field>

        <Form.Field required>
          <Form.Input name='passwordConfirm' type='password' label={intl.get("confirm-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={passwordConfirm} onChange={this.handleChange} onBlur={this.handleBlur('passwordConfirm')} />
                      // className={shouldMarkError('passwordConfirm') ? "error" : ""} />
        </Form.Field>
       
        {this.props.render({...this.state, isFormValid })}
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  token: PropTypes.string.isRequired
};

export default RegisterForm