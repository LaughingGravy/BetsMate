import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

class ResetForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { email } = this.state

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' 
                      value={email} onChange={this.handleChange} />
        </Form.Field>
       
        {this.props.render(this.state)}
      </Form>
    )
  }
}

export default ResetForm