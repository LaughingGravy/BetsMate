import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

const ChangePasswordSuccessPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" positive>
          
          <Message.Header>
            <Icon name="mail" size="large" />{intl.get("change-pwd-msg-header")}
          </Message.Header>
          <br />
          <Message.Content>
            {intl.getHTML("change-pwd-msg-content")}
          </Message.Content>
        </Message>
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default ChangePasswordSuccessPage