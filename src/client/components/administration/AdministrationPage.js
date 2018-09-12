import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Header, Grid, GridRow, Menu } from 'semantic-ui-react'

import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as ="h2">{intl.get("admin-page-title")}</Header>
      </Grid.Row>

       <GridRow centered>
        <Menu stackable pointing>
          <MenuItem as={NavLink} to={`${match.url}/country`} key="country" activeClassName="active"
                        compact="true">
              {intl.get("admin-country-menu-header")}
          </MenuItem>
        </Menu>
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