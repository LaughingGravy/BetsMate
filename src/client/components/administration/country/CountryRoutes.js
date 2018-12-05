import React from 'react';
import { Route } from 'react-router-dom'

import CountryPage from './CountryPage'
import CountriesPage from './CountriesPage'
import EditCountryPage from './EditCountryPage'
import UserRoleNoPermissionPage from '../../authentication/warnings/UserRoleNoPermissionPage'
import { withUser } from '../../contexts/withUserContext'

const CountryRoutes = ({ match, userCtx }) => {
  const { isAuthenticated, user: { role } } = userCtx

  return (
    <React.Fragment>
      {/* <Route path={`${match.path}/country`} render={({match}) => (
          !isAuthenticated || role != "admin" (<Redirect to="/administration" />) )} /> */}
      <Route exact path={`${match.path}/country`}  render={(props) => <CountryPage match={match} {...props}><CountriesPage {...props} /></CountryPage>} />
      <Route path={`${match.path}/country/countries`} render={(props) => <CountryPage match={match} {...props}><CountriesPage {...props}/></CountryPage>} />
      <Route exact path={`${match.path}/country/editcountry`} render={(props) => <CountryPage match={match} {...props}><EditCountryPage {...props}/></CountryPage>} /> 
      <Route path={`${match.path}/country/editcountry/:code`} render={(props) => <CountryPage match={match} {...props}><EditCountryPage {...props}/></CountryPage>} />    
    </React.Fragment>
  )
}
export default withUser(CountryRoutes)