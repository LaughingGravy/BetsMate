import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Segment, Container } from 'semantic-ui-react'

import { compose } from 'recompose'
import { renderOrIfAuthenticated, AuthenticatedUserErrorDisplay } from '../common/ConditionalRender'
import { withUser } from '../contexts/withUserContext'

import LinkForm from '../authentication/LinkForm'
import ResetButton from '../authentication/resetLink/ResetButton'

const vanillaResetPageContent = () => (
  <React.Fragment>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Segment compact basic textAlign="left" text="true">
          {intl.getHTML("reset-text")}
        </Segment>
      </GridColumn>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Container textAlign='center'>
          <LinkForm render={variables => (
            <ResetButton variables={variables} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>
  </React.Fragment>
)

const ResetPageContent = compose(
  renderOrIfAuthenticated(vanillaResetPageContent, AuthenticatedUserErrorDisplay, "userCtx", false) 
)(vanillaResetPageContent)

ResetPageContent.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(ResetPageContent)