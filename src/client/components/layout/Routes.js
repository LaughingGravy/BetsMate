import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Redirect } from '../../../../library/routing'

import AdministrationPage from '../administration/AdministrationPage'
import RegisterLinkPage from '../authentication/registerLink/RegisterLinkPage'
import RegisterLinkSuccessPage from '../authentication/registerLink/RegisterLinkSuccessPage'
import RegistrationPage from '../authentication/register/RegistrationPage'
import LoginPage from '../authentication/login/LoginPage'
import ResetPage from '../authentication/resetLink/ResetPage'
import ResetSuccessPage from '../authentication/resetLink/ResetSuccessPage'
import ResetPasswordPage from '../authentication/resetPassword/ResetPasswordPage'
import ChangePasswordPage from '../authentication/changePassword/ChangePasswordPage'
import ChangeSuccessPage from '../authentication/changePassword/ChangeSuccesPage'
import HomePage from '../home/HomePage'
import AboutPage from '../about/AboutPage'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/administration" component={AdministrationPage} />
            <Route exact path="/register/link" component={RegisterLinkPage} />
            <Route path="/register/link/success" component={RegisterLinkSuccessPage} />
            <Route path="/register/:token" component={RegistrationPage} />
            <Route path="/reset/link/success" component={ResetSuccessPage} />
            <Route from="/login" component={LoginPage} />
            <Route exact from="/reset/link" component={ResetPage} />
            <Route from="/reset/:token" component={ResetPasswordPage} />
            <Route exact from="/change/" component={ChangePasswordPage} />
            <Route from="/change/success" component={ChangeSuccessPage} />
            <Route path="/about" component={AboutPage} />
            <Redirect exact from="about-us" to="about" />
            <Redirect to="/" />
        </Switch> 
    );
}

export default Routes;
