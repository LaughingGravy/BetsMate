import React from 'react'
import intl from 'react-intl-universal'
import { Header, Responsive, Icon, Container, Grid, GridColumn } from 'semantic-ui-react'

import AuthForm from '../AuthForm'
import LoginButton from './LoginButton'
import LoginPageButtonGroup from './LoginPageButtonGroup'

const LoginPage = () => {
  return (
    <Grid columns={1} centered> 
      <Grid.Row centered>
        <Header as='h3' icon>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Icon name='sign in' />
          </Responsive>
          {intl.get("login-page-title")}
          <Header.Subheader>{intl.getHTML("login-page-sub-header")}</Header.Subheader>
        </Header>
      </Grid.Row>

      <Grid.Row centered>
        <GridColumn mobile={14} tablet={8} computer={6}>
          <Container textAlign='center'>
            <AuthForm render={props => (
              <LoginButton variables={props.variables} disabled={!props.isFormValid} /> 
              )}/>
            <LoginPageButtonGroup />
          </Container>  
        </GridColumn>
      </Grid.Row>
    </Grid>     
  )
}
  
export default LoginPage