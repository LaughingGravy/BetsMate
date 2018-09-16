import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

const VerifyFailurePage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" negative>
          
          <Message.Header>
            <Icon name="paper plane" size="large" />{intl.get("verify-email-fail-header")}
          </Message.Header>
          <br />
          <Message.Content>
            {intl.getHTML("verify-email-fail-msg-content")}
          </Message.Content>
        </Message>
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default VerifySuccessPage