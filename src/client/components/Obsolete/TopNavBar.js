import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Menu, Icon, Button, Responsive, Popup, MenuItem } from 'semantic-ui-react';
import intl from 'react-intl-universal';

import { withUser } from '../contexts/withUserContext'

const TopNavBar = ({ userCtx, onToggleSideBarVisibility }) => {
  return (
      <Menu attached>
        <Menu.Menu position="left">

          {(userCtx.user.role == 'admin') && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <Menu.Item as={NavLink} to="/administration" key="administration" 
                      activeClassName="active">
              {intl.get("admin-menu-header")}
            </Menu.Item>
          </Responsive>}

          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <Menu.Item as={NavLink} to="/about" key="about" activeClassName="active">
              {intl.get("about-menu-header")}
            </Menu.Item>
          </Responsive>
        </Menu.Menu>

         {!userCtx.isAuthenticated && <MenuItem as={Responsive} maxWidth={Responsive.onlyComputer.minWidth}>
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
          </MenuItem>}

        <Menu.Menu position="right" style={{"paddingBottom": "0px"}}>

          {userCtx.isAuthenticated && <Responsive basic="true" maxWidth={Responsive.onlyComputer.minWidth}>
            <Menu.Item fluid as={Button} onClick={onToggleSideBarVisibility}>
              <Icon name="log out" circular size="small" />
            </Menu.Item> 
          </Responsive>} 

          <Responsive basic="true" maxWidth={Responsive.onlyComputer.minWidth}>
            <Menu.Item fluid as={Button} onClick={onToggleSideBarVisibility}>
              <Icon name="sidebar" circular size="small" inverted />
            </Menu.Item> 
          </Responsive>    

        </Menu.Menu>
      </Menu>
  );
}

TopNavBar.propTypes = {
  userCtx: PropTypes.object,
  onToggleSideBarVisibility: PropTypes.func.isRequired
};

export default withUser(TopNavBar);