import React from 'react'
import intl from 'react-intl-universal'
import { Responsive, Header, Icon, Container, Grid, GridColumn, Segment } from 'semantic-ui-react'

// import ChangePasswordForm from './ChangePasswordForm'
// import ChangePasswordButton from './ChangePasswordButton'



const UserSettingsPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <Header as='h3' icon>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Icon name='settings' />
        </Responsive>
        {intl.get("user-settings-page-title")}
        <Header.Subheader>{intl.get("user-settings-page-sub-title")}</Header.Subheader>
      </Header>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Segment compact basic textAlign="left" text="true">
          {intl.getHTML("reset-password-text")}
        </Segment>
      </GridColumn>
    </Grid.Row>

    {/* <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>        
          <ChangePasswordForm render={renderProps => (
            <Container textAlign='center'>
              <ChangePasswordButton variables={renderProps.variables} disabled={!renderProps.isFormValid} /> 
            </Container>
          )}/>
      </GridColumn>
    </Grid.Row> */}

  </Grid>
)

export default UserSettingsPage