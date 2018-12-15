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
        <Header as ="h3">{intl.get("admin-page-title")}</Header>
      </Grid.Row>

       <Grid.Row centered>
        <Menu stackable pointing>
          {/* <Menu.Item as={NavLink} to={`${match.url}/country`} key="country" activeClassName="active"
                        compact="true">
              {intl.get("admin-country-menu-header")}
          </Menu.Item>
        
          <Menu.Item as={NavLink} to={`${match.url}/stadium`} key="stadium" activeClassName="active"
                        compact="true">
              {intl.get("admin-stadium-menu-header")}
          </Menu.Item> */}

          <Menu.Item as={NavLink} to={`${match.url}/general`} key="general" activeClassName="active"
                        compact="true">
              {intl.get("admin-general-menu-header")}
          </Menu.Item>
        
          <Menu.Item as={NavLink} to={`${match.url}/football`} key="football" activeClassName="active"
                        compact="true">
              {intl.get("admin-football-menu-header")}
          </Menu.Item>

           <Menu.Item as={NavLink} to={`${match.url}/afl`} key="afl" activeClassName="active"
                        compact="true">
              {intl.get("admin-afl-menu-header")}
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