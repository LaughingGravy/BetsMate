import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Responsive, Icon } from 'semantic-ui-react'

import { ICONS, SVG } from '../../../../../static/svgHelper'

const SideBarMenuItem = ({ onToggleSideBarVisibility }) => {

  return (
    <Responsive basic="true" maxWidth={Responsive.onlyMobile.maxWidth}>
      <Menu.Item fluid onClick={onToggleSideBarVisibility}>
        <SVG width="24" height="24" path={ICONS.SIDEBAR.path} viewBox={ICONS.SIDEBAR.viewBox} />
      </Menu.Item> 
    </Responsive>    
  )
}

SideBarMenuItem.propTypes = {
  onToggleSideBarVisibility: PropTypes.func.isRequired
};

export default SideBarMenuItem