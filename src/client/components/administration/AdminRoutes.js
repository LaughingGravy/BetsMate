import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../library/routing'

import CountryRoutes from './country/CountryRoutes'

const AdminRoutes = ({ match }) => {
  return (
      <Switch>
          <CountryRoutes match={match} />
          <Route component={NotFound} />
      </Switch> 
  );
}

AdminRoutes.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AdminRoutes;