import React from 'react';
import intl from 'react-intl-universal'

import { Grid, Header, Container } from 'semantic-ui-react'

import StadiaTable from './StadiaTable'

const StadiaPage = () => {
  return (
    <Container fluid>
      <Grid columns={1} centered>

        <Grid.Row centered>
          <Header as='h3' textAlign="center">{intl.get("stadia-page-title")}</Header>
        </Grid.Row>
        
        <Grid.Row centered>
            <StadiaTable  />
        </Grid.Row>

      </Grid>
    </Container>
  )
}

export default StadiaPage;