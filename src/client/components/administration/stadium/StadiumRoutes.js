import React from 'react';
import { Route } from 'react-router-dom'

import StadiumPage from './StadiumPage'
import StadiaPage from './StadiaPage'
import EditStadiumPage from './EditStadiumPage'

const StadiumRoutes = ({ match }) => {
  return (
    <React.Fragment>
      <Route exact path={`${match.path}/stadium`}  render={(props) => <StadiumPage match={match} {...props}><StadiaPage {...props} /></StadiumPage>} />
      <Route path={`${match.path}/stadium/stadia`} render={(props) => <StadiumPage match={match} {...props}><StadiaPage {...props}/></StadiumPage>} />
      <Route exact path={`${match.path}/stadium/editstadium`} render={(props) => <StadiumPage match={match} {...props}><EditStadiumPage {...props}/></StadiumPage>} /> 
      <Route path={`${match.path}/stadium/editstadium/:id`} render={(props) => <StadiumPage match={match} {...props}><EditStadiumPage {...props}/></StadiumPage>} /> 
    </React.Fragment>
  )
}

export default StadiumRoutes;