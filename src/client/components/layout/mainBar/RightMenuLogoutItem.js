import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { Menu } from 'semantic-ui-react'

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'
import LogoutButton from '../../authentication/LogoutButton'

const vanillaRightMenuLogoutItem = () => (
  <Menu.Item fitted="horizontally" key="logout">
    <LogoutButton />
  </Menu.Item>
)

const RightMenuLogoutItem = compose(
  renderIfAuthenticated(vanillaRightMenuLogoutItem)
)(vanillaRightMenuLogoutItem)

RightMenuLogoutItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(RightMenuLogoutItem)