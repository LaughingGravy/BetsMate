import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import '../../styles/auth.css'

import ValidationInput from '../../common/ValidationInput'
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
      pristineFields: {
        email: true,
        displayName: true,
        password: true,
        passwordConfirm: true,
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
    const { email, displayName, password, passwordConfirm, pristineFields } = this.state

    const errors = validateRegister(email, displayName, password, passwordConfirm)

    const isFormValid = !Object.keys(errors).some(x => errors[x])
    console.log("email", errors.filter(err => err.key == "email")[0].objs)

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>  
        <Form.Field required>
          <ValidationInput name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} onBlur={this.handleBlur('email')} 
                      errors={errors.filter(err => err.key == "email").objs}  />
                      {/* className={shouldMarkError(errors['email'], pristine['email']) ? "error" : ""} /> */}
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='displayName' type='text' label={intl.get("username-label")} placeholder={intl.get("username-placeholder")}
                      value={displayName} onChange={this.handleChange} onBlur={this.handleBlur('displayName')}
                      errors={errors.filter(err => err.key == "displayName").objs} />
                      {/* className={shouldMarkError(errors['displayName'], pristine['displayName']) ? "error" : ""} /> */}
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} onBlur={this.handleBlur('password')}
                      errors={errors.filter(err => err.key == "password").objs} />
                      {/* className={shouldMarkError(errors['password'], pristine['password']) ? "error" : ""} /> */}
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='passwordConfirm' type='password' label={intl.get("confirm-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={passwordConfirm} onChange={this.handleChange} onBlur={this.handleBlur('passwordConfirm')}
                      errors={errors.filter(err => err.key == "passwordConfirm").objs} />
                      {/* className={shouldMarkError('passwordConfirm') ? "error" : ""} /> */}
        </Form.Field>
       
        {this.props.render({...this.state, isFormValid })}
      </Form>
    )
  }
}

export default RegisterForm