import React from 'react'

import RightMenuUnAuthItems from './RightMenuUnAuthItems'
import RightMenuLogoutItem from './RightMenuLogoutItem'
import UserMenuItem from './UserMenuItems'

const RightMenuItems = () => (
  <React.Fragment>
    <RightMenuLogoutItem />
    <RightMenuUnAuthItems />
    <UserMenuItem />
  </React.Fragment> 
)

export default RightMenuItems