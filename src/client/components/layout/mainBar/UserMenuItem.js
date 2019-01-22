import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Responsive, Image } from 'semantic-ui-react'
import { compose } from 'recompose';

import { history } from '../../../../../library/routing'
import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext';

import LogoutPlainButton from '../../authentication/logout/LogoutPlainButton'

import { FlipSVGIcon, ICONS } from '../../../../../static/icons'

const person = <FlipSVGIcon path={ICONS.PERSON} width="180%" height="180%" />

const OPTIONS = [
  {
    key: "settings",
    icon: "settings",
    value: "settings",
    text: "user-change-settings-menu-item"
  },
  {
    key: "changepassword",
    icon: "spy",
    value: "changepassword",
    text: "change-password-menu-header"
  }
]

const vanillaUserMenuItem = ({userCtx}) => {
  const { displayName, email } = userCtx.user;

  const menuItemText = !displayName ? email : displayName;

  const onClick = (e, data) => {
    const { value } = data;

    if (value === "settings") {
      history.push('/user/settings');
    }
    else if (value === "changepassword") {
      history.push('/change-password');
    }
  }

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu.Item>
        <Dropdown
          button
          className='icon'
          labeled
          basic
          icon={person}
          floating
          text={menuItemText}>
          <Dropdown.Menu>    
            {OPTIONS.map(opt => <Dropdown.Item text={intl.get(opt.text)} icon={opt.icon} value={opt.value} key={opt.key} onClick={onClick} />)}    
            <Dropdown.Divider />
            <Dropdown.Item style={{"textAlign": "center"}}><LogoutPlainButton /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Responsive>
  )
}

const UserMenuItem = compose(
  renderIfAuthenticated(vanillaUserMenuItem)
)(vanillaUserMenuItem);

UserMenuItem.propTypes = {
  userCtx: PropTypes.object.isRequired
}

export default withUser(UserMenuItem);