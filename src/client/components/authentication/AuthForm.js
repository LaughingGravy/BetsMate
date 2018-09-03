import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class AuthForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { email, password } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} />
        </Form.Field>

        <Form.Field required>
          <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder='Password...' 
                      value={password} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render(this.state)}
      </Form>
    )
  }
}

export default AuthForm