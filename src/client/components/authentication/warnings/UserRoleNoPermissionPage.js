import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const UserRoleNoPermissionPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" warning 
            icon={<SVG fill="orange" path={ICONS.WARNING.path} viewBox={ICONS.WARNING.viewBox} width="48" height="48" />}
            header={intl.get("auth-page-decline-warning-title")}
            content= {intl.getHTML("auth-page-decline-warning-msg")} />
      </GridColumn>
    </Grid.Row>
  </Grid>
)

export default UserRoleNoPermissionPage