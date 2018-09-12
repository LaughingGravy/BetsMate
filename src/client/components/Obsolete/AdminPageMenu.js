import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { compose } from 'recompose'
import { Menu, MenuItem } from 'semantic-ui-react'

import { withUser } from '../contexts/withUserContext'
import { AdminFailAccessErrorDisplay, renderForAdminFailAccessError } from '../common/ConditionalRender'

const UnprotectedAdminPageMenu = ({ match }) => {
  return (
    <Menu stackable pointing>
      <MenuItem as={NavLink} to={`${match.url}/country`} key="country" activeClassName="active"
                    compact="true">
          {intl.get("admin-country-menu-header")}
      </MenuItem>
    </Menu>
  )
}

UnprotectedAdminPageMenu.propTypes = {
  match: PropTypes.object.isRequired,
  userCtx: PropTypes.object
}

const AdminPageMenu = compose(
  renderForAdminFailAccessError(AdminFailAccessErrorDisplay, "userCtx")
)(UnprotectedAdminPageMenu)

export default withUser(AdminPageMenu)


