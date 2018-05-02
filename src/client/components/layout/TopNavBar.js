import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Menu, Icon, Flag, Segment, Dropdown, Button, Responsive, Popup, MenuItem, MenuMenu } from 'semantic-ui-react';
import intl from 'react-intl-universal';

import Logout from '../authentication/Logout'
import { withUser } from '../contexts/withUserContext'

const TopNavBar = ({ locales, onSelectLocale, defaultLocale, userCtx, onToggleSideBarVisibility }) => {
  return (
    <Menu>
      <Menu.Menu position="left">

        <Menu.Item as={NavLink} to="/" key="home" activeClassName="active">
          <Icon name="home" size="large"  />
        </Menu.Item>

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

      <Menu.Menu position="right" style={{"paddingBottom": "0px"}}>
        <Menu.Item>
            <Dropdown trigger={<Flag name={locales.find(locale => locale.value === defaultLocale).flagid} />}
                      options={locales} compact
                      onChange={onSelectLocale} floating
                      key="locales" value={defaultLocale} />
        </Menu.Item>

        {!userCtx.isAuthenticated && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
          <Menu.Item as={NavLink}  to="/register" key="register"
                       activeClassName="active">
             {intl.get("register-menu-header")}
          </Menu.Item>
        </Responsive>} 

        {!userCtx.isAuthenticated && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
          <Menu.Item as={NavLink} to="/login" key="login"
                      activeClassName="active" >
            {intl.get("login-menu-header")}
          </Menu.Item>
        </Responsive>}

        {userCtx.isAuthenticated && <Responsive minWidth={Responsive.onlyComputer.minWidth}>
          <Logout>
            <Menu.Item as={NavLink}  to="/home" key="logout" activeClassName="active">
              {intl.get("logout-menu-header")}
            </Menu.Item>
          </Logout>
        </Responsive>} 

        {!userCtx.isAuthenticated && <MenuItem as={Responsive} maxWidth={Responsive.onlyComputer.minWidth}>
          <Popup position="bottom center" style={{"padding": "0px"}} hoverable basic trigger={<Icon name="user circle" size="large" />}>
          < Menu vertical compact>
              <MenuItem as={NavLink} to="/register" key="register" activeClassName="active"
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
  locales: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectLocale: PropTypes.func.isRequired,
  defaultLocale: PropTypes.string,
  userCtx: PropTypes.object,
  onToggleSideBarVisibility: PropTypes.func.isRequired
};

export default withUser(TopNavBar);