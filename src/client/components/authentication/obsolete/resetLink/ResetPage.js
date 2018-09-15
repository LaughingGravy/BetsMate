import React from 'react'
import intl from 'react-intl-universal'
import { Grid, Segment, Container } from 'semantic-ui-react'

import LinkForm from '../LinkForm'
import ResetButton from './ResetButton'

const ResetPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <h3>{intl.get("reset-page-title")}</h3>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Segment compact basic textAlign="left" text="true">
          {intl.getHTML("reset-text")}
        </Segment>
      </GridColumn>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Container textAlign='center'>
          <LinkForm render={variables => (
            <ResetButton variables={variables} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>

  </Grid>
)

export default ResetPage