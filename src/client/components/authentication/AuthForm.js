import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import { history } from '../../../../library/routing'

class AuthForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onLoginSuccessful(data) {
    history.goBack()
  }

  render() {
    const { email, password } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder='Password...' 
                      onChange={this.handleChange} />
        </Form.Field>
      </Form>>
    )
  }

}