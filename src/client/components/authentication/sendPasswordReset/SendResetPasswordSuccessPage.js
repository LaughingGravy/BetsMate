import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const SendResetPasswordSuccessPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" positive 
                icon={<SVG fill="green" path={ICONS.SEND.path} viewBox={ICONS.SEND.viewBox} width="48" height="48" />}
                header={ntl.get("link-msg-header")}
                content={intl.getHTML("reset-link-msg-content")} />
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default SendResetPasswordSuccessPage