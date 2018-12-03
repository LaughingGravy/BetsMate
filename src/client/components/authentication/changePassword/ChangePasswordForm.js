import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

import { validateChangePassword } from  './validate'
import { getErrObjs } from '../../validation/common'
import ValidationInput from '../../common/ValidationInput'

import { withUser } from '../../contexts/withUserContext'

class ChangePasswordForm  extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
      pristineFields: {
        password: true,
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
    const { password, newPassword, newPasswordConfirm, pristineFields } = this.state
    const { user: { email } } = this.props.userCtx
    const errors = validateChangePassword(password, newPassword, newPasswordConfirm)
    const passwordErrObjs = getErrObjs(errors, "password")
    const newPasswordErrObjs = getErrObjs(errors, "newPassword")
    const newPasswordConfirmErrObjs = getErrObjs(errors, "newPasswordConfirm")
    const isFormValid = !Object.keys(errors).some(x => errors[x])

    return (
      <Form className='segment' onSubmit={e => {
                                                  e.preventDefault;
                                                }}>    
        <Form.Field required>
          <ValidationInput name='password' type='password' label={intl.get("current-password-label")} 
                    placeholder={intl.get("password-placeholder")}
                      value={password} onChange={this.handleChange} onBlur={this.handleBlur('password')} 
                      errors={passwordErrObjs} pristine={pristineFields['password'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='newPassword' type='password' label={intl.get("new-password-label")} 
                           placeholder={intl.get("password-placeholder")}
                           value={newPassword} onChange={this.handleChange} onBlur={this.handleBlur('newPassword')}
                           errors={newPasswordErrObjs} pristine={pristineFields['newPassword'] ? 1 : 0} />
        </Form.Field>

        <Form.Field required>
          <ValidationInput name='newPasswordConfirm' type='password' label={intl.get("confirm-new-password-label")} 
                           placeholder={intl.get("password-placeholder")} 
                           value={newPasswordConfirm} onChange={this.handleChange} onBlur={this.handleBlur('newPasswordConfirm')}
                           errors={newPasswordConfirmErrObjs} pristine={pristineFields['newPasswordConfirm'] ? 1 : 0} />
        </Form.Field>
    
        {this.props.render({ variables: { email, password, newPassword }, isFormValid: isFormValid })}
      </Form>
    )
  }
}

ChangePasswordForm.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(ChangePasswordForm)