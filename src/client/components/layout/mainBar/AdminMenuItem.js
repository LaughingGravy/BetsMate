import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

import { Menu, Responsive } from 'semantic-ui-react'
import intl from 'react-intl-universal';

import { history } from '../../../../../library/routing'
import { renderIfRole } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

const vanillaAdminMenuItem = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}
              style={{"display": "flex", "flexDirection": "column", "justifyContent": "center"}}>
    <Menu.Item key="administration" fluid="true" onClick={e => history.push("/administration")}>
      <span>{intl.get("admin-menu-header")}</span>
    </Menu.Item>
  </Responsive>
)

const AdminMenuItem = compose(
  renderIfRole(vanillaAdminMenuItem)
)(vanillaAdminMenuItem)

AdminMenuItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(AdminMenuItem)