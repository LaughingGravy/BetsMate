import React from 'react'
import intl from 'react-intl-universal'
import { Responsive, Icon, Header, Container, Grid } from 'semantic-ui-react'

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


    <Grid.Row centered>
      <Grid.Column mobile={16} tablet={10} computer={8}>      
          <ChangePasswordForm render={renderProps => (
            <Container textAlign='center'>
              <ChangePasswordButton variables={renderProps.variables} disabled={!renderProps.isFormValid} /> 
            </Container>
          )}/>
      </Grid.Column>
    </Grid.Row>

  </Grid>
)

export default ChangePasswordPage