import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Segment, Container } from 'semantic-ui-react'

import LinkForm from '../LinkForm'
import SendResetPasswordButton from './SendResetPasswordButton'

const SendPasswordResetPage = () => (
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
          <LinkForm render={props => (
            <SendResetPasswordButton variables={props.variables} disabled={!props.isFormValid} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>

  </Grid>
)

export default SendPasswordResetPage