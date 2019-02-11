import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const ChangePasswordSuccessPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" positive>
          
          <Message.Header>
            <SVG path={ICONS.MAIL.path} viewBox={ICONS.MAIL.viewBox} width="48" height="48" />{intl.get("change-pwd-msg-header")}
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