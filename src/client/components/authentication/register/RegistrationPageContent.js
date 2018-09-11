import React from 'react';
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { compose } from 'recompose'

import { renderOrIfAuthenticated, AuthenticatedUserErrorDisplay } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

import { Grid, Container, GridColumn, Segment } from 'semantic-ui-react'
import RegisterButton from './RegisterButton'
import RegisterForm from './RegisterForm'

const vanillaRegPageContent = ({token}) => {
  return (  
    <React.Fragment>
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
    </React.Fragment>      
  )
}

const RegistrationPageContent = compose(
  renderOrIfAuthenticated(vanillaRegPageContent, AuthenticatedUserErrorDisplay, "userCtx", false) 
)(vanillaRegPageContent)

RegistrationPageContent.propTypes = {
  userCtx: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}
  
export default withUser(RegistrationPageContent)
