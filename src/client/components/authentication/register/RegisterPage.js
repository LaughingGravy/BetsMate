import React from 'react';
import intl from 'react-intl-universal'
import { Responsive, Grid, GridColumn, Header, Icon, Container } from 'semantic-ui-react'

import RegisterForm from './RegisterForm'
import RegisterButton from './RegisterButton'

const RegistrationPage = ({match}) => {
  const { token } = match.params

  return (   
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as='h3' icon>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Icon name='signup' />
          </Responsive>
          {intl.get("register-page-title")}
          <Header.Subheader>{intl.getHTML("registration-text")}</Header.Subheader>
        </Header>
      </Grid.Row>

      <Grid.Row centered>
        <GridColumn mobile={14} tablet={8} computer={6}>
            <RegisterForm token={token} render={props => (
              <Container textAlign="center">
                <RegisterButton variables={{ email: props.email, displayName: props.displayName, password: props.password, timeZone: props.timeZone }} disabled={!props.isFormValid} /> 
              </Container>
            )}/> 
        </GridColumn>
      </Grid.Row>

    </Grid>      
  )
}
  
export default RegistrationPage;