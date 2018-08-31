import React from 'react'
import intl from 'react-intl-universal'
import { Grid, Container, GridColumn } from 'semantic-ui-react'

import LoginButton from './LoginButton'
import LoginPageAlternativeButtonGroup from './LoginPageAlternativeButtonGroup'
import { withAuthButtonAuthForm } from '../withAuthButtonAuthForm'

const AuthFormWithLoginButton = withAuthButtonAuthForm(LoginButton)

const LoginPage = () => {
    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
          <h3>{intl.get("login-page-title")}</h3>
          </Grid.Row>

          <Grid.Row centered>
            <GridColumn mobile={14} tablet={8} computer={6}>
              <Container textAlign='center'>
                <AuthFormWithLoginButton />
                <LoginPageAlternativeButtonGroup />
              </Container>  
            </GridColumn>
          </Grid.Row>

        </Grid>
      </Container>            
    )
}
  
export default LoginPage