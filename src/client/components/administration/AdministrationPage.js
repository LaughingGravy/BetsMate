import React from 'react'
import { NavLink } from 'react-router-dom'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Header, Responsive,  Icon, Grid, Menu } from 'semantic-ui-react'

import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as='h3' icon>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Icon name='university' />
          </Responsive>
          {intl.get("admin-page-title")}
          <Header.Subheader>{intl.get("admin-pagesub-header")}</Header.Subheader>
        </Header>
      </Grid.Row>

       <Grid.Row centered>
        <Menu pointing>
          <Menu.Item as={NavLink} to={`${match.url}/general/country`} key="general" activeClassName="active"
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