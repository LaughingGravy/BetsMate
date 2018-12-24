import React from 'react';
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import CountryPage from './CountryPage'
import CountriesPage from './CountriesPage'
import EditCountryPage from './EditCountryPage'

const CountryRoutes = ({ match }) => {
  return (
    <React.Fragment>
      <Route exact path={`${match.path}/country`}  render={(props) => <CountryPage match={match} {...props}><CountriesPage {...props} /></CountryPage>} />
      <Route path={`${match.path}/country/countries`} render={(props) => <CountryPage match={match} {...props}><CountriesPage {...props}/></CountryPage>} />
      <Route exact path={`${match.path}/country/edit`} render={(props) => <CountryPage match={match} {...props}><EditCountryPage {...props}/></CountryPage>} /> 
      <Route path={`${match.path}/country/edit/:code`} render={(props) => <CountryPage match={match} {...props}><EditCountryPage {...props}/></CountryPage>} /> 
    </React.Fragment>
  )
}

CountryRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default CountryRoutes;