import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'

import ResetChangePasswordForm from './ResetChangePasswordForm'
import ResetChangePasswordButton from './ResetChangePasswordButton'

const ResetChangePasswordPage = (props) => {
  const { match: { params }} = props;
  const { email, passwordVerificationString } = params;

  return (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <h3>{intl.get("change-password-page-title")}</h3>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Segment compact basic textAlign="left" text="true">
          {intl.getHTML("reset-password-text")}
        </Segment>
      </GridColumn>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>        
          <ResetChangePasswordForm render={renderProps => (
            <Container textAlign='center'>
              <ResetChangePasswordButton variables={{email: email, 
                                                      token: decodeURIComponent(passwordVerificationString), 
                                                      password: renderProps.password}}  
                                         disabled={renderProps.disabled} /> 
            </Container>
          )}/>
      </GridColumn>
    </Grid.Row>

  </Grid>
  )
}

SendResetPasswordButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired
  }).isRequired
}

ResetChangePasswordPage.propTypes = {

  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}

export default ResetChangePasswordPage