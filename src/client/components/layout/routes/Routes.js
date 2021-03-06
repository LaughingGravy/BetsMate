import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Redirect } from '../../../../../library/routing'

import HomePage from '../../home/HomePage'
import AboutPage from '../../about/AboutPage'
import GuardedRoutes from './GuardedRoutes'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />  
        <Route path="/about" component={AboutPage} />  

        <GuardedRoutes />
        
        <Redirect exact from="about-us" to="about" /> 
        <Redirect to="/home" />
    </Switch> 
)

export default Routes
