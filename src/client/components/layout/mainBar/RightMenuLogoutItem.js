import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { Menu, Responsive, Button } from 'semantic-ui-react'

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'
import LogoutButton from '../../authentication/LogoutButton'

const vanillaRightMenuLogoutItem = () => (
  <React.Fragment>
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Menu.Item fitted="horizontally" key="logout">
      <LogoutButton />
    </Menu.Item>
  </Responsive>

  {/* <Responsive maxWidth={Responsive.onlyMobile.maxnWidth}>
    <Menu.Item>
      <LogoutButton icon="sign-out" circular={true} />
    </Menu.Item> 
  </Responsive> */}
  </React.Fragment>
)

const RightMenuLogoutItem = compose(
  renderIfAuthenticated(vanillaRightMenuLogoutItem)
)(vanillaRightMenuLogoutItem)

RightMenuLogoutItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(RightMenuLogoutItem)