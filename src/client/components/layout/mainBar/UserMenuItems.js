import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Responsive, Message } from 'semantic-ui-react'
import { compose } from 'recompose';

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext';

const OPTIONS = [
  {
    key: "settings",
    value: "settings",
    text: "Change Settings"
  },
  {
    key: "logout",
    value: "logout",
    text: "Logout"
  }
]

const UserMenuItem = ({userCtx}) => {
  const { displayName, email } = userCtx.user;

  return (
    <Menu.Item>
      <Dropdown
          button
          className='icon'
          labeled
          basic
          icon='user'
          floating
          options={OPTIONS}
          text={!displayName ? email : displayName}/>
    </Menu.Item>
  )
}

export default withUser(UserMenuItem);