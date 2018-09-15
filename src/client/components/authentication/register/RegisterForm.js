import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class RegisterForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      displayName: "",
      password: "",
      passwordConfirm: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { displayName, password, passwordConfirm, timeZone } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>  
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='displayName' type='text' label={intl.get("username-label")} placeholder={intl.get("username-placeholder")}
                      value={displayName} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='passwordConfirm' type='password' label={intl.get("confirm-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={passwordConfirm} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render({email: email, password: password, displayName: displayName, timeZone: timeZone})}
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  token: PropTypes.string.isRequired
};

export default RegisterForm