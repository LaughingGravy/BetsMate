import React from 'react'
import intl from 'react-intl-universal'
import { Header, Responsive, Container, Grid } from 'semantic-ui-react'

import ResetChangePasswordForm from './ResetChangePasswordForm'
import ResetChangePasswordButton from './ResetChangePasswordButton'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const ResetChangePasswordPage = ({ match }) => {
  const { email, passwordVerificationString } = match.params;

  return (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <Header as='h3' icon>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <SVG path={ICONS.FIRSTAID.path} viewBox={ICONS.FIRSTAID.viewBox} width="48" height="48" />
        </Responsive>
        {intl.get("change-password-page-title")}
        <Header.Subheader>{intl.getHTML("reset-password-text")}</Header.Subheader>
      </Header>
    </Grid.Row>

    <Grid.Row centered>
      <Grid.Column mobile={16} tablet={10} computer={8}>      
        <ResetChangePasswordForm render={renderProps => (
          <Container textAlign='center'>
            <ResetChangePasswordButton variables={{email: email, 
                                                    token: decodeURIComponent(passwordVerificationString), 
                                                    password: renderProps.password}}  
                                        disabled={!renderProps.isFormValid} /> 
          </Container>
        )}/>
      </Grid.Column>
    </Grid.Row>

  </Grid>
  )
}

export default ResetChangePasswordPage