import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Responsive, Icon } from 'semantic-ui-react'

const SideBarMenuItem = ({ onToggleSideBarVisibility }) => {

  return (
    <Responsive basic="true" maxWidth={Responsive.onlyMobile.maxWidth}>
      <Menu.Item fluid as={Button} onClick={onToggleSideBarVisibility}>
        <Icon name="sidebar" circular size="small" inverted />
      </Menu.Item> 
    </Responsive>    
  )
}

SideBarMenuItem.propTypes = {
  onToggleSideBarVisibility: PropTypes.func.isRequired
};

export default SideBarMenuItem