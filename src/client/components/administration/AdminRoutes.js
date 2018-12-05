import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../library/routing'
import { withUser } from '../contexts/withUserContext'

import CountryRoutes from './country/CountryRoutes'

const AdminRoutes = ({ match, userCtx }) => {
  const { isAuthenticated, user: { role } } = userCtx
  
  return (
      <Switch>
          {/* <CountryRoutes match={match} /> */}
           <CountryRoutes render={({match}) => (
            !isAuthenticated || role != "admin" ? (<UserRoleNoPermissionPage /> ) : (<CountryRoutes match={match} />) )} />

          <Route component={NotFound} />
      </Switch> 
  );
}

AdminRoutes.propTypes = {
  match: PropTypes.object.isRequired,
  userCtx: PropTypes.object.isRequired
};

export default withUser(AdminRoutes);