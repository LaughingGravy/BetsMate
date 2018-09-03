import React from 'react'
import intl from 'react-intl-universal'
import { Container, Grid,  } from 'semantic-ui-react'

import RestForm from './ResetForm'
import ResetButton from './ResetButton'

const ResetPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <h3>{intl.get("reset-page-title")}</h3>
    </Grid.Row>

    <Grid.Row>
      {intl.get("reset-body-text")}
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Container textAlign='center'>
          <RestForm render={variables => (
            <ResetButton variables={variables} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>

  </Grid>
)

export default ResetPage