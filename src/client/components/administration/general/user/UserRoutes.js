import React from 'react';
import { Route } from 'react-router-dom'

import UserSettingsPage from './UserSettingsPage'

const UserRoutes = ({ match }) => {
  console.log("UserRoutes match", match)
  return (
    <React.Fragment>
      <Route exact path={`${match.path}/user`}  render={(props) => <UserSettingsPage match={match} {...props}><UsersPage {...props} /></UserSettingsPage>} />
      {/* <Route exact path={`${match.path}/stadium`}  render={(props) => <StadiumPage match={match} {...props}><StadiaPage {...props} /></StadiumPage>} /> */}
      {/* <Route path={`${match.path}/stadium/stadia`} render={(props) => <StadiumPage match={match} {...props}><StadiaPage {...props}/></StadiumPage>} />
      <Route exact path={`${match.path}/stadium/edit`} render={(props) => <StadiumPage match={match} {...props}><EditStadiumPage {...props}/></StadiumPage>} /> 
      <Route path={`${match.path}/stadium/edit/:id`} render={(props) => <StadiumPage match={match} {...props}><EditStadiumPage {...props}/></StadiumPage>} />  */}
    </React.Fragment>
  )
}

export default UserRoutes;