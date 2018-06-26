import React from 'react';
import { Route } from 'react-router-dom'

import CountryPage from './CountryPage'
import CountriesPage from './CountriesPage'
import AddCountryPage from './AddCountryPage';

const CountryRoutes = ({ match }) => {
  return (<React.Fragment>
      <Route exact path={`${match.path}/country`}  render={(props) => <CountryPage match={match} {...props}><CountriesPage {...props} /></CountryPage>} />
      <Route path={`${match.path}/country/countries`} render={(props) => <CountryPage match={match} {...props}><CountriesPage {...props}/></CountryPage>} />
      <Route path={`${match.path}/country/createcountry`} render={(props) => <CountryPage match={match} {...props}><AddCountryPage {...props}/></CountryPage>} />     
    </React.Fragment>
  )
}
export default CountryRoutes