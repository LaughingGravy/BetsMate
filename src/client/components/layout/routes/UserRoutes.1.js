import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { withUser } from '../../contexts/withUserContext'

import AdministrationPage from '../../administration/AdministrationPage'
import RegisterLinkPage from '../../authentication/registerLink/RegisterLinkPage'
import RegistrationPage from '../../authentication/register/RegistrationPage'
import LoginPage from '../../authentication/login/LoginPage'
import ResetPage from '../../authentication/resetLink/ResetPage'
import ResetPasswordPage from '../../authentication/resetPassword/ResetPasswordPage'
import ChangePasswordPage from '../../authentication/changePassword/ChangePasswordPage'

import UserLoggedInWarningPage from '../../authentication/warnings/UserLoggedInWarningPage'
import UserNotAuthenticatedWarningPage from '../../authentication/warnings/UserNotAuthenticatedWarningPage'
import UserRoleNoPermissionPage from '../../authentication/warnings/UserRoleNoPermissionPage'

const UserRoutes = ({ userCtx }) => {
  const { isAuthenticated, user: { role } } = userCtx

  return (
    <React.Fragment>
      {/* <Route path="/login" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<LoginPage match={match} />) )} />

      <Route exact path="/register/:token" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<RegistrationPage match={match} />) )} />
      
       <Route exact path="/register/link" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<RegisterLinkPage match={match} />) )} />

      <Route exact path="/reset/link" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<ResetPage match={match} />) )} />

      <Route path="/reset/:token" render={({match}) => (
          isAuthenticated ? (<UserLoggedInWarningPage /> ) : (<ResetPasswordPage match={match} />) )} />

      <Route exact path="/change" render={({match}) => (
          !isAuthenticated ? (<UserNotAuthenticatedWarningPage /> ) : (<ChangePasswordPage match={match} />)  )} />

      <Route exact path="/administration" render={({match}) => (
          !isAuthenticated || role != "admin" ? (<UserRoleNoPermissionPage /> ) : (<AdministrationPage match={match} />) )} /> */}
    </React.Fragment>
  )
}

UserRoutes.propTypes = {
    userCtx: PropTypes.object.isRequired
  };

export default withUser(UserRoutes)