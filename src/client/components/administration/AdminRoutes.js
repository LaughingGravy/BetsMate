import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../library/routing'

import GeneralPage from './general/GeneralPage'
import CountryRoutes from './country/CountryRoutes'
import StadiumRoutes from './stadium/StadiumRoutes'

const AdminRoutes = ({ match }) => {
  return (
      <Switch>
       <Route exact path="/administration/general" component={GeneralPage} />  
       <CountryRoutes match={match} />
       <StadiumRoutes match={match} /> 
       <Route component={NotFound} />
      </Switch>
  );
}

AdminRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default AdminRoutes;
