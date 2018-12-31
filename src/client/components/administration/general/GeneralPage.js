import React from 'react';
import { Grid , Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { history } from '../../../../../library/routing'
import GeneralRoutes from './GeneralRoutes'
import CountryTab from './CountryTab'
import StadiumTab from './StadiumTab'

const getPanes = (match) => {
  return [
    { menuItem: 'Countries', render: () => <CountryTab  match={match} /> },
    { menuItem: 'Stadia', render: () => <StadiumTab  match={match} /> },
    { menuItem: 'Users', render: () => <Tab.Pane attached={false}>User</Tab.Pane> }
  ]
}

const GeneralPage = ({ match }) => {

  const handleTabChange = (e, data) => {
    const { activeIndex } = data

    switch (activeIndex) {
      case 0:
        history.push('/administration/general/country')
      break;

      case 1:
        history.push('/administration/general/stadium');
      break;

      case 2:
      break;

      default:
        history.push('/administration/general/country')
    }
    

  }

  return (
    <Grid columns={1} centered>
        <Tab menu={{ secondary: true, pointing: true }} panes={getPanes(match)} onTabChange={handleTabChange} />
        <GeneralRoutes match={match} />
    </Grid>
  )
}

GeneralPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default GeneralPage;