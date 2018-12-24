import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../../library/routing'

import GeneralPage from './GeneralPage'

const GeneralRoutes = ({ match }) => {
  return (
      <Switch>
       <Route path={`${match.url}/general`} render={(props) => <GeneralPage {...props} />} />
       <Route component={NotFound} />
      </Switch>
  );
}

GeneralRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default GeneralRoutes;