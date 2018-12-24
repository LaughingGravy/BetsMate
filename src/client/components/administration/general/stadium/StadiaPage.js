import React from 'react';
import intl from 'react-intl-universal'
import { Grid, GridColumn, Header } from 'semantic-ui-react'

import StadiaTable from './StadiaTable'

const StadiaPage = () => {
    return (
        <Grid columns={1} centered>

          <Grid.Row centered>
            <Header as='h3' textAlign="center">{intl.get("stadia-page-title")}</Header>
          </Grid.Row>
          
          <Grid.Row centered>
            <GridColumn>

              <StadiaTable />

            </GridColumn>
          </Grid.Row>

        </Grid>
    )
}

export default StadiaPage