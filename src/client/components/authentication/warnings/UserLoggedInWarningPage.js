import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message, Icon } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const UserLoggedInWarningPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
      <Message size="big" warning
          icon={<SVG fill="orange" path={ICONS.WARNING.path} viewBox={ICONS.WARNING.viewBox} width="48" height="48" />}
          header={intl.get("user_loggedin-warning-page-title")}
          content={intl.getHTML("user_loggedin-message-error")} />
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default UserLoggedInWarningPage