import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import { validateResetChangePassword } from  './validate'
import { getErrObjs } from '../../validation/common'
import ValidationInput from '../../common/controls/ValidationInput'

class ResetChangePasswordForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      newPassword: "",
      newPasswordConfirm: "",
      pristineFields: {
        newPassword: true,
        newPasswordConfirm: true
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleBlur = (name) => (e) => {
    this.setState({
      pristineFields: { ...this.state.pristineFields, [name]: false }
    })
  }

  render() {
    const { newPassword, newPasswordConfirm, pristineFields } = this.state
    const errors = validateResetChangePassword(newPassword, newPasswordConfirm)
    const newPasswordErrObjs = getErrObjs(errors, "newPassword")
    const newPasswordConfirmErrObjs = getErrObjs(errors, "newPasswordConfirm")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <ValidationInput name='newPassword' type='password' label={intl.get("new-password-label")} placeholder={intl.get("password-placeholder")}
                      value={newPassword} onChange={this.handleChange} onBlur={this.handleBlur('newPassword')}
                      errors={newPasswordErrObjs} pristine={pristineFields['newPassword'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='newPasswordConfirm' type='password' label={intl.get("confirm-new-password-label")} placeholder={intl.get("password-placeholder")} 
                      value={newPasswordConfirm} onChange={this.handleChange} onBlur={this.handleBlur('newPasswordConfirm')}
                      errors={newPasswordConfirmErrObjs} pristine={pristineFields['newPasswordConfirm'] ? 1 : 0} />
        </Form.Field>
       
        {this.props.render({ password: newPassword, isFormValid: isFormValid })}
      </Form>
    )
  }
}

export default ResetChangePasswordForm