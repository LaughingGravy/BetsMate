import React from 'react'
import intl from 'react-intl-universal'
import { Header, Responsive, Container, Grid } from 'semantic-ui-react'

import AuthForm from '../AuthForm'
import LoginButton from './LoginButton'
import LoginPageButtonGroup from './LoginPageButtonGroup'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const LoginPage = () => {
  return (
    <Grid columns={1} centered> 
      <Grid.Row centered>
        <Header as='h3' icon>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <SVG path={ICONS.SIGNIN.path} viewBox={ICONS.SIGNIN.viewBox} width="48" height="48" />
          </Responsive>
          {intl.get("login-page-title")}
          <Header.Subheader>{intl.getHTML("login-page-sub-header")}</Header.Subheader>
        </Header>
      </Grid.Row>

      <Grid.Row centered>
        <Grid.Column mobile={16} tablet={10} computer={8}> 
          <Container textAlign='center'>
            <AuthForm render={props => (
              <LoginButton variables={props.variables} disabled={!props.isFormValid} /> 
              )}/>
            <LoginPageButtonGroup />
          </Container>  
        </Grid.Column>
      </Grid.Row>
    </Grid>     
  )
}
  
export default LoginPage