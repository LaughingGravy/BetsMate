import React from 'react';
import intl from 'react-intl-universal'
import { Responsive, Grid, Header, Container } from 'semantic-ui-react'

import RegisterForm from './RegisterForm'
import RegisterButton from './RegisterButton'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const RegistrationPage = ({match}) => {
  const { token } = match.params

  return (   
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as='h3' icon>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <SVG path={ICONS.REGISTER.path} viewBox={ICONS.REGISTER.viewBox} width="48" height="48" />
          </Responsive>
          {intl.get("register-page-title")}
          <Header.Subheader>{intl.getHTML("registration-text")}</Header.Subheader>
        </Header>
      </Grid.Row>

      <Grid.Row centered>
        <Grid.Column mobile={16} tablet={10} computer={8}> 
            <RegisterForm token={token} render={props => (
              <Container textAlign="center">
                <RegisterButton variables={{ email: props.email, displayName: props.displayName, password: props.password, timeZone: props.timeZone }} disabled={!props.isFormValid} /> 
              </Container>
            )}/> 
        </Grid.Column>
      </Grid.Row>

    </Grid>      
  )
}
  
export default RegistrationPage;