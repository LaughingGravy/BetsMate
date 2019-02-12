import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const VerifyEmailSuccessPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" positive
                icon={<SVG fill="green" path={ICONS.SEND.path} viewBox={ICONS.SEND.viewBox} width="48" height="48" /> }
                header={intl.get("verify-email-success-header")}
                content={intl.getHTML("verify-email-msg-content")} />
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default VerifyEmailSuccessPage