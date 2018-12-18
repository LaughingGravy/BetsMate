import React from 'react'
import intl from 'react-intl-universal'
import { Header, Responsive, Icon, Container, Grid, GridColumn } from 'semantic-ui-react'

import ResetChangePasswordForm from './ResetChangePasswordForm'
import ResetChangePasswordButton from './ResetChangePasswordButton'

const ResetChangePasswordPage = ({ match }) => {
  const { email, passwordVerificationString } = match.params;

  return (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <Header as='h3' icon>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Icon name='emergency' />
        </Responsive>
        {intl.get("change-password-page-title")}
        <Header.Subheader>{intl.getHTML("reset-password-text")}</Header.Subheader>
      </Header>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>        
          <ResetChangePasswordForm render={renderProps => (
            <Container textAlign='center'>
              <ResetChangePasswordButton variables={{email: email, 
                                                      token: decodeURIComponent(passwordVerificationString), 
                                                      password: renderProps.password}}  
                                         disabled={!renderProps.isFormValid} /> 
            </Container>
          )}/>
      </GridColumn>
    </Grid.Row>

  </Grid>
  )
}

export default ResetChangePasswordPage