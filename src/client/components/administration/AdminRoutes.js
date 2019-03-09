import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../library/routing'
import GeneralRoutes from './general/GeneralRoutes'

const AdminRoutes = ({ match }) => {
  return (
      <Switch>
       <GeneralRoutes match={match} /> 
       <Route component={NotFound} />
      </Switch>
  );
}

AdminRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default AdminRoutes;
