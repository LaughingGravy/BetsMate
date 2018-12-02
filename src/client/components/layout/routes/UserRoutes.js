import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { withUser } from '../../contexts/withUserContext'

import AdministrationPage from '../../administration/AdministrationPage'
import RegisterPage from '../../authentication/register/RegisterPage'
import RegisterLinkSentSuccessPage from '../../authentication/register/RegisterLinkSentSuccessPage'
import LoginPage from '../../authentication/login/LoginPage'
import VerifyEmailPage from '../../authentication/verifyEmail/VerifyEmailPage'
import VerifyEmailSuccessPage from '../../authentication/verifyEmail/VerifyEmailSuccessPage'
import SendPasswordResetPage from '../../authentication/sendPasswordReset/SendPasswordResetPage'
import SendResetPasswordSuccessPage from '../../authentication/sendPasswordReset/SendResetPasswordSuccessPage'
import ResetChangePasswordPage from '../../authentication/resetChangePassword/ResetChangePasswordPage'
import VerifyPasswordResetPage from '../../authentication/verifyPasswordReset/VerifyPasswordResetPage'
import VerifyResetFailurePage from '../../authentication/verifyPasswordReset/VerifyResetFailurePage'
import ChangePasswordPage from '../../authentication/changePassword/ChangePasswordPage'
import ChangePasswordSuccessPage from '../../authentication/changePassword/ChangePasswordSuccessPage'

import UserLoggedInWarningPage from '../../authentication/warnings/UserLoggedInWarningPage'
import UserNotAuthenticatedWarningPage from '../../authentication/warnings/UserNotAuthenticatedWarningPage'
import UserRoleNoPermissionPage from '../../authentication/warnings/UserRoleNoPermissionPage'

const UserRoutes = ({ userCtx }) => {
  const { isAuthenticated, user: { role } } = userCtx

  return (
    <React.Fragment>   

      <Route exact path="/administration" render={({match}) => (
          !isAuthenticated || role != "admin" ? (<UserRoleNoPermissionPage /> ) : (<AdministrationPage match={match} />) )} />

      <Route path="/login" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<LoginPage match={match} />) )} />

      <Route exact path="/register" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<RegisterPage match={match} />) )} />
      
      <Route exact path="/register/linksent" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<RegisterLinkSentSuccessPage />) )} />

       <Route exact path="/verify-email/:email/:emailVerificationString" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyEmailPage match={match} />) )} />

      <Route path="/verify-email/success" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyEmailSuccessPage match={match} />) )} />

      <Route exact path="/reset-password" render={({match}) => (
          isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<SendPasswordResetPage match={match} />) )} />

      <Route exact path="/reset-password/success" render={({match}) => (
          isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<SendResetPasswordSuccessPage match={match} />) )} /> 

      <Route exact path="/verify-reset-password/:email/:passwordVerificationString" render={({match}) => (
          isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<VerifyPasswordResetPage match={match} />) )} />
  
      <Route exact path="/reset/change-password/:email/:passwordVerificationString" render={({match}) => (
          isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<ResetChangePasswordPage match={match} />) )} />

      <Route exact path="/reset/change-password/success" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<ChangePasswordSuccessPage match={match} />) )} />

      <Route exact path="/verify-reset-password/failure" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<VerifyResetFailurePage match={match} />) )} />

      <Route exact path="/change-password" render={({match}) => (
          !isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<ChangePasswordPage match={match} />) )} />
      
    </React.Fragment>
  )
}

UserRoutes.propTypes = {
    userCtx: PropTypes.object.isRequired
  };

export default withUser(UserRoutes)