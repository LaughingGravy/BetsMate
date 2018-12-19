import React from 'react';
import { Grid , Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Users', render: () => <Tab.Pane attached={false}>Users</Tab.Pane> },
  { menuItem: 'Countries', render: () => <Tab.Pane attached={false}>Country</Tab.Pane> },
  { menuItem: 'Stadia', render: () => <Tab.Pane attached={false}>Stadium</Tab.Pane> },
]

const GeneralPage = () => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Grid.Row>
    </Grid>
  )
}

export default GeneralPage;