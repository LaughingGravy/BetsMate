import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import '../styles/auth.css'

import { validateLogin } from '../authentication/login/validate'
import { getErrObjs } from '../validation/common'
import ValidationInput from '../common/ValidationInput'

class AuthForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: "",
      pristineFields: {
        email: true,
        password: true
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
    const { email, password, pristineFields } = this.state
    const errors = validateLogin(email, password)
    const emailErrObjs = getErrObjs(errors, "email")
    const passwordErrObjs = getErrObjs(errors, "password")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>   
        <Form.Field required>
          <ValidationInput name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} onBlur={this.handleBlur('email')}
                      errors={emailErrObjs} pristine={pristineFields['email'] ? 1 : 0}  />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} onBlur={this.handleBlur('password')}
                      errors={passwordErrObjs} pristine={pristineFields['password'] ? 1 : 0} />
        </Form.Field>
       
        {this.props.render({ variables: { email, password }, isFormValid: isFormValid })}
      </Form>
    )
  }
}

export default AuthForm