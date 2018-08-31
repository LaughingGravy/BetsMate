import React from 'react';
import intl from 'react-intl-universal'

import { Grid, Container, GridColumn } from 'semantic-ui-react'
import RegisterButton from './RegisterButton'
import { withAuthButtonAuthForm } from '../withAuthButtonAuthForm'

const AuthFormWithRegisterButton = withAuthButtonAuthForm(RegisterButton)

const RegistrationPage = () => {
    return (   
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
          <h3>{intl.get("register-page-title")}</h3>
          </Grid.Row>

          <Grid.Row centered>
            <GridColumn mobile={14} tablet={8} computer={6}>
              < Container textAlign='center'>
                <AuthFormWithRegisterButton />
              </Container>  
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Container>       
    )
}
  
  export default RegistrationPage;