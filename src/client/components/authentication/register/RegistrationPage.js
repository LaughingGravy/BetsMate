import React from 'react';
import intl from 'react-intl-universal'

import { Grid, Container, GridColumn, Segment } from 'semantic-ui-react'
import RegisterButton from './RegisterButton'
import RegisterForm from './RegisterForm'

const RegistrationPage = ({match}) => {
  const { token } = match.params

  return (   
    <Grid columns={1} centered>
      <Grid.Row centered>
      <h3>{intl.get("register-page-title")}</h3>
      </Grid.Row>

      <Grid.Row centered>
        <GridColumn mobile={14} tablet={8} computer={6}>
          <Segment compact basic textAlign="left" text="true">
            {intl.getHTML("registration-activate-text")}
          </Segment>
        </GridColumn>
      </Grid.Row>

      <Grid.Row centered>
        <GridColumn mobile={14} tablet={8} computer={6}>
            <RegisterForm token={token} render={variables => (
              <Container textAlign="center">
                <RegisterButton variables={variables} /> 
              </Container>
            )}/> 
        </GridColumn>
      </Grid.Row>
    </Grid>      
  )
}
  
  export default RegistrationPage;