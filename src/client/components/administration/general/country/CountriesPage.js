import React from 'react';
import intl from 'react-intl-universal'
import { Grid, Header, Container } from 'semantic-ui-react'

import CountriesTable from './CountriesTable'

const CountriesPage = () => {
    return (
        <Container fluid>
          <Grid columns={1} centered>

            <Grid.Row centered>
              <Header as='h3' textAlign="center">{intl.get("countries-page-title")}</Header>
            </Grid.Row>
            
            <Grid.Row centered> 
              <CountriesTable  />
            </Grid.Row>

          </Grid>
        </Container>
    )
}

export default CountriesPage;