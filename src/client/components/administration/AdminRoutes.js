import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../library/routing'

import CountryPage from '../administration/country/CountryPage'

const AdminRoutes = ({ match }) => {
  return (
      <Switch>
          <Route path={`${match.path}/country`} component={CountryPage} />
          <Route component={NotFound} />
      </Switch> 
  );
}

AdminRoutes.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AdminRoutes;