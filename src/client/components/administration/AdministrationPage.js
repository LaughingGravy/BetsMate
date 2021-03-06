import React from 'react'
import { NavLink } from 'react-router-dom'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Header, Responsive, Grid, Menu } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../static/svgHelper'

import AdminRoutes from './AdminRoutes'

const AdministrationPage = ( { match }) => {

  const getDefaultGeneralTabRoute = () => {
    let routePath = ""
    let index = 0
    const savedIndex = localStorage.getItem('generalPageTabIndex')

    if (!savedIndex) {
      index = 0
    } else {
      index = parseInt(savedIndex)
    }

    switch (index) {
      case 0:
        routePath = '/general/country'
      break;

      case 1:
        routePath = '/general/stadium'
      break;

      case 2:
      break;

      default:
        routePath = '/general/country'
    }
    return `${match.url}${routePath}`
  }

  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Header as='h3' icon>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <SVG path={ICONS.ADMIN.path} width="48" height="48" viewBox={ICONS.ADMIN.viewBox}/>
          </Responsive>
          {intl.get("admin-page-title")}
          <Header.Subheader>{intl.get("admin-pagesub-header")}</Header.Subheader>
        </Header>
      </Grid.Row>

       <Grid.Row centered>
        <Menu pointing>
          <Menu.Item as={NavLink} to={getDefaultGeneralTabRoute()} key="general" activeClassName="active"
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