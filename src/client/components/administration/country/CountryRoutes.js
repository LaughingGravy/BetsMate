import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NotFound } from '../../../../../library/routing'

import CountriesPage from '../../administration/country/CountriesPage'
import AddCountryPage from '../../administration/country/AddCountryPage'

const CountryRoutes = ({ match }) => {
  return (
      <Switch>
          <Route path={`${match.path}/countries`} component={CountriesPage} />
          <Route path={`${match.path}/createcountry`} component={AddCountryPage} />
          <Route component={NotFound} />
      </Switch> 
  );
}

CountryRoutes.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CountryRoutes;