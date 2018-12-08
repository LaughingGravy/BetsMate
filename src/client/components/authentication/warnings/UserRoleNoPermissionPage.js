import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

const UserRoleNoPermissionPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" warning>
          
          <Message.Header>
            <Icon name="warning" size="large" />{intl.get("auth-page-decline-warning-title")}
          </Message.Header>
          <br />
          <Message.Content>
            {intl.getHTML("auth-page-decline-warning-msg")}
          </Message.Content>
        </Message>
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default UserRoleNoPermissionPage