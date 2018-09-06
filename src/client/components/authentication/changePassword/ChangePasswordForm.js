import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class ChangePasswordForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      password: "",
      passwordConfirm: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { password, passwordConfirm } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='passwordConfirm' type='password' label={intl.get("confirm-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={passwordConfirm} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render({password: password})}
      </Form>
    )
  }
}

export default ChangePasswordForm