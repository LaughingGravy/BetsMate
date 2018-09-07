import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class RegisterForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      username: "",
      password: "",
      passwordConfirm: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { username, password, passwordConfirm } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>  
        <Form.Field required>
          <Form.Input name='username' type='text' label={intl.get("username-label")} placeholder={intl.get("username-placeholder")}
                      value={username} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='passwordConfirm' type='password' label={intl.get("confirm-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={passwordConfirm} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render({token: this.props.token, password: password, username: username})}
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  token: PropTypes.string.isRequired
};

export default RegisterForm