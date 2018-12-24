import React from 'react';
import { Grid , Tab } from 'semantic-ui-react'

import GeneralRoutes from './GeneralRoutes'
import CountryRoutes from './country/CountryRoutes'
import CountryTab from './CountryTab'

const getPanes = (match) => {
  return [
    { menuItem: 'Countries', render: () => <CountryTab  match={match} /> },
    { menuItem: 'Users', render: () => <Tab.Pane attached={false}>User</Tab.Pane> }
  ]
}

const GeneralPage = ({match}) => {
  console.log("GeneralPage match", match)
  return (
    <Grid columns={1} centered>
        <Tab menu={{ secondary: true, pointing: true }} panes={getPanes(match)} />
        <GeneralRoutes match={match} />
    </Grid>
  )
}

export default GeneralPage;