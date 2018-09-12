import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Redirect } from '../../../../../library/routing'

import RegisterLinkSuccessPage from '../../authentication/registerLink/RegisterLinkSuccessPage'
import ResetSuccessPage from '../../authentication/resetLink/ResetSuccessPage'
import ChangeSuccessPage from '../../authentication/changePassword/ChangeSuccesPage'
import HomePage from '../../home/HomePage'
import AboutPage from '../../about/AboutPage'

import UserRoutes from './UserRoutes'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Redirect exact from="about-us" to="about" /> 
        <Route path="/register/link/success" component={RegisterLinkSuccessPage} />
        <Route path="/reset/link/success" component={ResetSuccessPage} />
        <Route from="/change/success" component={ChangeSuccessPage} />

        <UserRoutes />

        <Redirect to="/" />
    </Switch> 
)

export default Routes
