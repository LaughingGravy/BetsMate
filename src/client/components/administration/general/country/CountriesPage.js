import React from 'react';
import intl from 'react-intl-universal'
import { Grid, GridColumn, Header } from 'semantic-ui-react'

import CountriesTable from './CountriesTable'

const CountriesPage = () => {
    return (
        <Grid columns={1} centered>

          <Grid.Row centered>
            <Header as='h3' textAlign="center">{intl.get("countries-page-title")}</Header>
          </Grid.Row>
          
          <Grid.Row centered>
            <GridColumn>

              <CountriesTable  />

            </GridColumn>
          </Grid.Row>

        </Grid>
    )
}

export default CountriesPage;