import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class RegisterForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      displayName: "",
      password: "",
      passwordConfirm: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { displayName, password, passwordConfirm, pristine } = this.state
    const errors = validate(email, password, passwordConfirm)
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    const shouldMarkError = (name) => {
      const hasError = errors[name];
      const shouldShow = !pristine[name];
      
      return hasError ? shouldShow : false;
    };

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>  
        <Form.Field required>
          <Form.Input name='displayName' type='text' label={intl.get("username-label")} placeholder={intl.get("username-placeholder")}
                      value={displayName} onChange={this.handleChange} onBlur={this.handleBlur('displayName')} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} onBlur={this.handleBlur('password')} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='passwordConfirm' type='password' label={intl.get("confirm-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={passwordConfirm} onChange={this.handleChange} onBlur={this.handleBlur('passwordConfirm')} />
        </Form.Field>
       
        {this.props.render({token: this.props.token, password: password, displayName: displayName})}
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  token: PropTypes.string.isRequired
};

export default RegisterForm