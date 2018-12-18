import React from 'react'
import intl from 'react-intl-universal'
import { Responsive, Icon, Header, Container, Grid, GridColumn, Segment } from 'semantic-ui-react'

import ChangePasswordForm from './ChangePasswordForm'
import ChangePasswordButton from './ChangePasswordButton'

const ChangePasswordPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
    <Header as='h3' icon>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Icon name='spy' />
        </Responsive>
        {intl.get("change-password-page-title")}
        <Header.Subheader>{intl.get("reset-password-text")}</Header.Subheader>
      </Header>
    </Grid.Row>

    {/* <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Segment compact basic textAlign="left" text="true">
          {intl.getHTML("reset-password-text")}
        </Segment>
      </GridColumn>
    </Grid.Row> */}

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>        
          <ChangePasswordForm render={renderProps => (
            <Container textAlign='center'>
              <ChangePasswordButton variables={renderProps.variables} disabled={!renderProps.isFormValid} /> 
            </Container>
          )}/>
      </GridColumn>
    </Grid.Row>

  </Grid>
)

export default ChangePasswordPage