import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'

import ResetChangePasswordForm from './ResetChangePasswordForm'
import ResetChangePasswordButton from './ResetChangePasswordButton'

const ResetChangePasswordPage = (props) => {
  console.log("props", props)
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
              <ResetChangePasswordButton variables={{email: props.email, token: props.token, password: renderProps.newpassword}} /> 
            </Container>
          )}/>
      </GridColumn>
    </Grid.Row>

  </Grid>
  )
}

// ResetChangePasswordPage.propTypes = {
//   email: PropTypes.string.isRequired,
//   token: PropTypes.string.isRequired
// }

export default ResetChangePasswordPage