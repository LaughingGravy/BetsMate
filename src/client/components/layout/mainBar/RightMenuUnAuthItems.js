import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { Menu, Button, Responsive } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext';

const vanillaRegisterMenuItem = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Menu.Item fitted="horizontally" key="registerlink">
      <Button size="mini" basic compact secondary onClick={e => history.push("/register/link")}>
        {intl.get("register-menu-header")}
      </Button>
    </Menu.Item>
  </Responsive>
)

const EnhancedRegisterMenuItem = compose(
  renderIfAuthenticated(vanillaRegisterMenuItem, "userCtx", false)
)(vanillaRegisterMenuItem)

EnhancedRegisterMenuItem.propTypes = {
   userCtx: PropTypes.object.isRequired
}

const RegisterMenuItem = withUser(EnhancedRegisterMenuItem)

const vanillaLoginMenuItem = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Menu.Item fitted="horizontally" key="loginlink">
      <Button size="mini" basic compact secondary onClick={e => history.push("/login")}>
        {intl.get("login-menu-header")}
      </Button>
    </Menu.Item>
  </Responsive>
)

const EnhancedLoginMenuItem = compose(
  renderIfAuthenticated(vanillaLoginMenuItem, "userCtx", false)
)(vanillaLoginMenuItem)

EnhancedLoginMenuItem.propTypes = {
   userCtx: PropTypes.object.isRequired
}

const LoginMenuItem = withUser(EnhancedLoginMenuItem)

const RightMenuUnAuthItems = () => (
  <React.Fragment>   
    <RegisterMenuItem />
    <LoginMenuItem />
  </React.Fragment>
)

export default RightMenuUnAuthItems