import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

import { hideIfTestFails } from '../../common/ConditionalRender'
import { compose } from 'recompose';

const vanillaVerifyResetFailurePage = ({error, verified, message}) => {

  console.log("error, verified, message", error, verified, message)
  return (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" negative>
          
          <Message.Header>
            <Icon name="paper plane" size="large" />{intl.get("verify-reset-fail-header")}
          </Message.Header>
          <br />
          <Message.Content>
            <span>{intl.getHTML("verify-reset-fail-msg-content")}<br />{intl.getHTML(message)}</span>
          </Message.Content>
        </Message>
      </GridColumn>
    </Grid.Row>
  </Grid>
)
}

vanillaVerifyResetFailurePage.PropTypes = {
  verified: PropTypes.bool.isRequired,
  message: PropTypes.string
}

// const notVerifiedAndMessageToDisplay = hideIfTestFails(VerifyResetFailurePage, 
//           props => !props.error && !props.verified && props.message
// )

// const VerifyResetFailurePage = compose(
//   notVerifiedAndMessageToDisplay(vanillaVerifyResetFailurePage)
// )(vanillaVerifyResetFailurePage)

const VerifyResetFailurePage = vanillaVerifyResetFailurePage

export default VerifyResetFailurePage