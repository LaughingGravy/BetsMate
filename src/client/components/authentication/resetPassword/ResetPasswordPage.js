import React from 'react'
import intl from 'react-intl-universal'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'

import ResetPasswordForm from './ResetPasswordForm'
import ResetPasswordButton from './ResetPasswordButton'

const ResetPasswordPage = ({match}) => {
  const { token } = match.params

  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <h3>{intl.get("reset-password-page-title")}</h3>
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
            <ResetPasswordForm token={token} render={variables => (
              <Container textAlign='center'>
                <ResetPasswordButton variables={variables} /> 
              </Container>
            )}/>
        </GridColumn>
      </Grid.Row>

    </Grid>
  )
}

export default ResetPasswordPage