import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

const VerifyEmailFailurePage = ({ message }) => {

  return (
    <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" negative>
          
          <Message.Header>
            <Icon name="paper plane" size="large" />{intl.get("verify-email-fail-header")}
          </Message.Header>
          <br />
          <Message.Content>
            <span>{intl.getHTML("verify-email-fail-msg-content")}<br />{intl.getHTML(message)}</span>
          </Message.Content>
        </Message>
      </GridColumn>
    </Grid.Row>
  </Grid>
  )
}

VerifyEmailFailurePage.propTypes = {
  message: PropTypes.string.isRequired
}

export default VerifyEmailFailurePage