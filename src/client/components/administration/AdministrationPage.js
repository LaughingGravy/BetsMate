import React from 'react'
import { NavLink } from 'react-router-dom'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Header, Grid, Menu } from 'semantic-ui-react'

import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as ="h2">{intl.get("admin-page-title")}</Header>
      </Grid.Row>

       <Grid.Row centered>
        <Menu stackable pointing>
          <Menu.Item as={NavLink} to={`${match.url}/country`} key="country" activeClassName="active"
                        compact="true">
              {intl.get("admin-country-menu-header")}
          </Menu.Item>
        </Menu>
      </Grid.Row>

      <Grid.Row centered>
        <AdminRoutes match={match} />
      </Grid.Row>
    </Grid>
  )
}

AdministrationPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default AdministrationPage