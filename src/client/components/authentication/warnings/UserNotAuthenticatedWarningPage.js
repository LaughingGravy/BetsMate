import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const UserNotAuthenticatedWarningPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" warning
          icon={<SVG fill="orange" path={ICONS.WARNING.path} viewBox={ICONS.WARNING.viewBox} width="48" height="48" />}
          header={intl.get("user_not_loggedin-warning-page-title")}
          content={intl.getHTML("user_not_loggedin-message-error")} />
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default UserNotAuthenticatedWarningPage