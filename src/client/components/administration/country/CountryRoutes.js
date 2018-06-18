import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Redirect } from '../../../../../library/routing'

import HomePage from '../../home/HomePage'
import AdministrationPage from '../../administration/AdministrationPage'
import CountryPage from '../../administration/country/CountryPage'
import CountriesPage from '../../administration/country/CountriesPage'
import AddCountryPage from '../../administration/country/AddCountryPage'

const CountryRoutes = ({ match }) => {
  return (
      <Switch>
          <Route path={`${match.path}/country`} component={CountryPage} /> 
          <Route path={`${match.path}/countries`} component={CountriesPage} />
          <Route path={`${match.path}/createcountry`} component={AddCountryPage} />
          <Redirect to={`${match.path}/administration`} />
      </Switch> 
  );
}

export default CountryRoutes;