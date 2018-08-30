import React from 'react'
import intl from 'react-intl-universal'
import { Grid, Container, GridColumn } from 'semantic-ui-react'

import AuthForm from './AuthForm'
import LoginPageAlternativeButtonGroup from './LoginPageAlternativeButtonGroup'

const LoginPage = () => {
    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
          <h3>{intl.get("login-page-title")}</h3>
          </Grid.Row>

          <Grid.Row centered>
            <GridColumn mobile={16} tablet={8} computer={4}>
              <Container textAlign='center'>
                <AuthForm />
                <LoginPageAlternativeButtonGroup />
              </Container>  
            </GridColumn>
          </Grid.Row>

        </Grid>
      </Container>            
    )
}
  
export default LoginPage