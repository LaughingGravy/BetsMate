import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Redirect } from '../../../../library/routing'

import CountryPage from '../administration/country/CountryPage'

const AdminRoutes = ({ match }) => {
  return (
      <Switch>
          <Route path={`${match.path}/country`} component={CountryPage} />
          <Redirect to={`${match.path}/administration`} />
      </Switch> 
  );
}

export default AdminRoutes;