import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

import { Menu, Responsive } from 'semantic-ui-react'
import intl from 'react-intl-universal';

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

const vanillaAdminMenuItem = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Menu.Item as={NavLink} to="/administration" key="administration" activeClassName="active">
      {intl.get("admin-menu-header")}
    </Menu.Item>
  </Responsive>
)

const AdminMenuItem = compose(
  renderIfAuthenticated(vanillaAdminMenuItem)
)(vanillaAdminMenuItem)

AdminMenuItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(AdminMenuItem)