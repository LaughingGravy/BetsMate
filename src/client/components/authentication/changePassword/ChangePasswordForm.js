import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import { withUser } from '../../contexts/withUserContext'

class ChangePasswordForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      password: "",
      newPassword: "",
      newPasswordConfirm: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { password, newPassword, newPasswordConfirm } = this.state
    const { user: { email } } = this.props.userCtx

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("current-password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='newPassword' type='password' label={intl.get("new-password-label")} placeholder={intl.get("password-placeholder")}
                      value={newPassword} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='newPasswordConfirm' type='password' label={intl.get("confirm-new-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={newPasswordConfirm} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render({email: email, password: password, newPassword: newPassword})}
      </Form>
    )
  }
}

ChangePasswordForm.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(ChangePasswordForm)