import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { withUser } from '../../contexts/withUserContext'

import AdministrationPage from '../../administration/AdministrationPage'
import VerifyEmailPage from '../../authentication/verifyEmail/VerifyEmailPage'
import VerifyEmailSuccessPage from '../../authentication/verifyEmail/VerifySuccessPage'
import VerifyEmailFailurePage from '../../authentication/verifyEmail/VerifyFailurePage'



//import RegisterLinkPage from '../../authentication/registerLink/RegisterLinkPage'
import RegisterPage from '../../authentication/register/RegisterPage'
import LoginPage from '../../authentication/login/LoginPage'
//import ResetPage from '../../authentication/resetLink/ResetPage'
//import ResetPasswordPage from '../../authentication/resetPassword/ResetPasswordPage'
import ChangePasswordPage from '../../authentication/changePassword/ChangePasswordPage'
import SendPasswordResetEmailPage from '../../authentication/sendPasswordResetEmail/SendPasswordResetEmailPage'

import UserLoggedInWarningPage from '../../authentication/warnings/UserLoggedInWarningPage'
import UserNotAuthenticatedWarningPage from '../../authentication/warnings/UserNotAuthenticatedWarningPage'
import UserRoleNoPermissionPage from '../../authentication/warnings/UserRoleNoPermissionPage'

const UserRoutes = ({ userCtx }) => {
  const { isAuthenticated, user: { role } } = userCtx

  return (
    <React.Fragment>   

      <Route exact path="/administration" render={({match}) => (
          !isAuthenticated || role != "admin" ? (<UserRoleNoPermissionPage /> ) : (<AdministrationPage match={match} />) )} />
          
      <Route exact path="/register" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<RegisterPage match={match} />) )} />
      
      <Route exact path="/verify-email" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyEmailPage match={match} />) )} />

      <Route exact path="/verify-email-success" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyEmailSuccessPage match={match} />) )} />
       
       <Route exact path="/verify-email-failure" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyEmailFailurePage match={match} />) )} />

       <Route exact path="/change-password" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<ChangePasswordPage match={match} />) )} />

       <Route path="/login" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<LoginPage match={match} />) )} />

       <Route exact path="/send-password-reset" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<SendPasswordResetEmailPage match={match} />) )} />

      <Route exact path="/verify-email?email=:email&emailVerificationString=:emailVerificationString" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyEmailPage match={match} />) )} />



       
       <Route exact path="/register/link" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<RegisterLinkPage match={match} />) )} />

      <Route exact path="/reset/link" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<ResetPage match={match} />) )} />

      <Route path="/reset/:token" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<ResetPasswordPage match={match} />) )} />

      <Route exact path="/change" render={({match}) => (
          !isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<ChangePasswordPage match={match} />)  )} />

      
    </React.Fragment>
  )
}

UserRoutes.propTypes = {
    userCtx: PropTypes.object.isRequired
  };

export default withUser(UserRoutes)