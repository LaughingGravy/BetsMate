import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Redirect } from '../../../../library/routing';

import AdministrationPage from '../administration/AdministrationPage';
import RegistrationPage from '../authentication/RegistrationPage';
import LoginPage from '../authentication/LoginPage';
import HomePage from '../home/HomePage';
import AboutPage from '../about/AboutPage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/administration" component={AdministrationPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route from="/login" component={LoginPage} />
            <Route path="/about" component={AboutPage} />
            <Redirect exact from="about-us" to="about" />
            <Redirect to="/" />
        </Switch> 
    );
}

export default Routes;
