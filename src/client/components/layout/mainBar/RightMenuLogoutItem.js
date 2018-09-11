import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Menu, Responsive } from 'semantic-ui-react'

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'
import LogoutPlainButton from '../../authentication/logout/LogoutPlainButton'
import LogoutIconButton from '../../authentication/logout/LogoutIconButton'

const vanillaRightMenuLogoutItem = () => (
  <React.Fragment>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu.Item fitted="horizontally" key="logout">
        <LogoutPlainButton />
      </Menu.Item>
    </Responsive>

    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <Menu.Item key="logout">
        <LogoutIconButton />
      </Menu.Item>
    </Responsive>
  </React.Fragment>
)

const RightMenuLogoutItem = compose(
  renderIfAuthenticated(vanillaRightMenuLogoutItem)
)(vanillaRightMenuLogoutItem)

RightMenuLogoutItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(RightMenuLogoutItem)