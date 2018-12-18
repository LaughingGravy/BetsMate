import React from 'react'

import RightMenuUnAuthItems from './RightMenuUnAuthItems'
import UserMenuItem from './UserMenuItem'

const RightMenuItems = () => (
  <React.Fragment>
    <RightMenuUnAuthItems />
    <UserMenuItem />
  </React.Fragment> 
)

export default RightMenuItems