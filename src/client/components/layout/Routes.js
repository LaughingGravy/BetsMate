import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Redirect } from '../../../../library/routing'

import AdministrationPage from '../administration/AdministrationPage'
import RegistrationPage from '../authentication/register/RegistrationPage'
import LoginPage from '../authentication/login/LoginPage'
import ResetPage from '../authentication/resetLink/ResetPage'
import ResetSuccessPage from '../authentication/resetLink/ResetSuccessPage'
import ResetPasswordPage from '../authentication/resetPassword/ResetPasswordPage'
import HomePage from '../home/HomePage'
import AboutPage from '../about/AboutPage'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/administration" component={AdministrationPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/resetsuccess" component={ResetSuccessPage} />
            <Route from="/login" component={LoginPage} />
            <Route from="/resetlink" component={ResetPage} />
            <Route from="/resetchange/:token" component={ResetPasswordPage} />
            <Route path="/about" component={AboutPage} />
            <Redirect exact from="about-us" to="about" />
            <Redirect to="/" />
        </Switch> 
    );
}

export default Routes;
