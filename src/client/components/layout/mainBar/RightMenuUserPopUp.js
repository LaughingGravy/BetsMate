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
    <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
      <Popup position="bottom center" style={{"padding": "0px"}} hoverable basic trigger={<Icon name="user circle" size="large" />}>
        <Menu vertical compact>
          <MenuItem as={NavLink} to="/register/link" key="registerlink" activeClassName="active"
                    compact="true">
            {intl.get("register-menu-header")}
          </MenuItem>
          <MenuItem as={NavLink} to="/login" key="login" activeClassName="active"
                    compact="true">
            {intl.get("login-menu-header")}
          </MenuItem>
        </Menu>   
      </Popup>
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