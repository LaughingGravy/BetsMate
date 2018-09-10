import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { Menu, Button, Responsive } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext';

const vanillaRightMenuUnAuthItems = () => (
  <React.Fragment>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu.Item fitted="horizontally" key="registerlink">
        <Button size="mini" basic compact secondary onClick={e => history.push("/register/link")}>
          {intl.get("register-menu-header")}
        </Button>
      </Menu.Item>
    </Responsive>

    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu.Item fitted="horizontally" key="loginlink">
        <Button size="mini" basic compact secondary onClick={e => history.push("/login")}>
          {intl.get("login-menu-header")}
        </Button>
      </Menu.Item>
    </Responsive>
  </React.Fragment>
)

const RightMenuUnAuthItems = compose(
  renderIfAuthenticated(vanillaRightMenuUnAuthItems, "userCtx", false)
)(vanillaRightMenuUnAuthItems)

RightMenuUnAuthItems.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(RightMenuUnAuthItems)