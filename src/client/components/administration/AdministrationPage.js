import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Header, Grid, GridRow } from 'semantic-ui-react'

import AdminPageMenu from './AdminPageMenu'
import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as ="h1">{intl.get("admin-page-title")}</Header>
      </Grid.Row>

       <GridRow centered>
        <AdminPageMenu match={match} />
      </GridRow>

      <GridRow centered>
        <AdminRoutes match={match} />
      </GridRow>
    </Grid>
  )
}

AdministrationPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default AdministrationPage