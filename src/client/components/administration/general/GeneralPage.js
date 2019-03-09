import React, { useEffect, useState } from 'react';
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

function GeneralPage({ match }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  
  useEffect(() => {
    const index = localStorage.getItem('generalPageTabIndex')

    if (index) {
      setActiveTabIndex(index)
    }
  })

  const handleTabChange = (e, { activeIndex }) => {
    localStorage.setItem('generalPageTabIndex', activeIndex)

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
        <Tab menu={{ secondary: true, pointing: true }} activeIndex={activeTabIndex} 
              panes={getPanes(match)} onTabChange={handleTabChange} />
        <GeneralRoutes match={match} />
    </Grid>
  )
}

GeneralPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default GeneralPage;