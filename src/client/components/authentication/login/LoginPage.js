import React from 'react'
import intl from 'react-intl-universal'
import { Container, Grid, GridColumn } from 'semantic-ui-react'

import AuthForm from '../AuthForm'
import LoginButton from './LoginButton'
import LoginPageButtonGroup from './LoginPageButtonGroup'

const LoginPage = () => {
  return (
    <Grid columns={1} centered> 
      <Grid.Row centered>
      <h3>{intl.get("login-page-title")}</h3>
      </Grid.Row>

      <Grid.Row centered>
        <GridColumn mobile={14} tablet={8} computer={6}>
          <Container textAlign='center'>
            <AuthForm render={props => (
              <LoginButton variables={{ email: props.email, password: props.password }} disabled={!props.isFormValid} /> 
              )}/>
            <LoginPageButtonGroup />
          </Container>  
        </GridColumn>
      </Grid.Row>
    </Grid>     
  )
}
  
export default LoginPage