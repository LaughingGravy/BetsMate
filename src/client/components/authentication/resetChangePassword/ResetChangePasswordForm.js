import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class ResetChangePasswordForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      newPassword: "",
      newPasswordConfirm: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { newPassword, newPasswordConfirm } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='newPassword' type='password' label={intl.get("new-password-label")} placeholder={intl.get("password-placeholder")}
                      value={newPassword} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='newPasswordConfirm' type='password' label={intl.get("confirm-new-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={newPasswordConfirm} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render({newPassword: newPassword})}
      </Form>
    )
  }
}

export default ResetChangePasswordForm