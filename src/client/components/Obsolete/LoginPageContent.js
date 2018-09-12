import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { renderOrIfAuthenticated, AuthenticatedUserErrorDisplay } from '../common/ConditionalRender'
import { withUser } from '../contexts/withUserContext'

import AuthForm from '../authentication/AuthForm'
import LoginButton from '../authentication/login/LoginButton'
import LoginPageButtonGroup from '../authentication/login/LoginPageButtonGroup'

const vanillaLoginPageContent = () => {
  return (
    <React.Fragment>
      <AuthForm render={variables => (
        <LoginButton variables={variables} /> 
      )}/>
      <LoginPageButtonGroup />
    </React.Fragment>  
  )
}

const LoginPageContent = compose(
  renderOrIfAuthenticated(vanillaLoginPageContent, AuthenticatedUserErrorDisplay, "userCtx", false) 
)(vanillaLoginPageContent)

LoginPageContent.propTypes = {
  userCtx: PropTypes.object.isRequired
}
  
export default withUser(LoginPageContent)