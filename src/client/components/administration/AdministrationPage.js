import React from 'react'
import intl from 'react-intl-universal'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu,  MenuItem, Grid, GridRow } from 'semantic-ui-react'

import { withUser } from '../contexts/withUserContext'
import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <h1>{intl.get("admin-page-title")}</h1>
      </Grid.Row>

      <Grid.Row centered>
          <Menu stackable pointing>
            <MenuItem as={NavLink} to={`${match.url}/country`} key="country" activeClassName="active"
                         compact="true">
                {intl.get("admin-country-menu-header")}
              </MenuItem>
          </Menu>
      </Grid.Row> 

      <GridRow centered>
        <AdminRoutes match={match} />
      </GridRow>
    </Grid>
  )
}

AdministrationPage.propTypes = {
  match: PropTypes.object.isRequired,
  userCtx: PropTypes.object
};

export default withUser(AdministrationPage);