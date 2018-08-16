import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { compose } from 'recompose'
import { Menu, MenuItem } from 'semantic-ui-react'

import { withUser } from '../contexts/withUserContext'
import { AuthorisationDeclineDisplay, renderForAuthDecline } from '../common/AuthorisationDeclineDisplay'

const UnprotectedAdminPageMenu = ({ match, userCtx }) => {
  console.log("AdminPageMenu userCtx", userCtx)
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
  renderForAuthDecline(AuthorisationDeclineDisplay, "userCtx")
)(UnprotectedAdminPageMenu)

export default withUser(AdminPageMenu)


