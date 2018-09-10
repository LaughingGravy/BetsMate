import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

import { Menu } from 'semantic-ui-react';
import intl from 'react-intl-universal';

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

const vanillaAdminMenuItem = () => (
  <Menu.Item as={NavLink} to="/administration" key="administration" fitted="horizontally" activeClassName="active">
    {intl.get("admin-menu-header")}
  </Menu.Item>
)

const AdminMenuItem = compose(
  renderIfAuthenticated(vanillaAdminMenuItem)
)(vanillaAdminMenuItem)

AdminMenuItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(AdminMenuItem)