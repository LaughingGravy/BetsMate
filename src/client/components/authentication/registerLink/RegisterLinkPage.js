import React from 'react'
import intl from 'react-intl-universal'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'

import LinkForm from '../LinkForm'
import RegisterLinkButton from './RegisterLinkButton'

const RegisterLinkPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <h3>{intl.get("register-link-page-title")}</h3>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Segment compact basic textAlign="left" text="true">
          {intl.getHTML("registration-link-text")}
        </Segment>
      </GridColumn>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Container textAlign='center'>
          <LinkForm render={variables => (
            <RegisterLinkButton variables={variables} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>

  </Grid>
)

export default RegisterLinkPage