import React from 'react'

import RightMenuUnAuthItems from './RightMenuUnAuthItems'
import RightMenuLogoutItem from './RightMenuLogoutItem'

const RightMenuItems = () => (
  <React.Fragment>
    <RightMenuLogoutItem />
    <RightMenuUnAuthItems />
  </React.Fragment> 
)

export default RightMenuItems