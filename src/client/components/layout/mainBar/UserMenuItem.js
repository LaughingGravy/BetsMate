import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Responsive } from 'semantic-ui-react'
import { compose } from 'recompose';

import { history } from '../../../../../library/routing'
import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext';

import LogoutPlainButton from '../../authentication/logout/LogoutPlainButton'

import { SVG, SVGIcon, ICONS } from '../../../../../static/svgHelper'

const OPTIONS = [
  {
    key: "settings",
    value: "settings",
    icon: <SVG path={ICONS.SETTINGS.path} width="18" height="18" viewBox={ICONS.SETTINGS.viewBox} />,
    text: "user-change-settings-menu-item"
  },
  {
    key: "changepassword",
    icon: <SVG path={ICONS.SPY.path} width="18" height="18" viewBox={ICONS.SPY.viewBox} />,
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
    <Responsive minWidth={Responsive.onlyTablet.minWidth} style={{"display": "flex", "alignContent": "flexStart"}}>
      <Menu.Item>
        <Dropdown
          button
          className='icon'
          labeled
          basic
          icon={<SVGIcon path={ICONS.PERSON.path} width="32" height="32" viewBox={ICONS.PERSON.viewBox} />}
          floating
          text={menuItemText}>
          <Dropdown.Menu>    
            {OPTIONS.map(opt => <Dropdown.Item text={intl.get(opt.text)} value={opt.value} icon={opt.icon} key={opt.key} onClick={onClick} />)}     
            <Dropdown.Divider />
            <Dropdown.Item><LogoutPlainButton /></Dropdown.Item>
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