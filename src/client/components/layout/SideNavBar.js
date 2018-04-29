import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import intl from 'react-intl-universal';
import { Sidebar, Menu, Button, Icon, Segment, Grid, Divider } from 'semantic-ui-react'

import { withUser } from '../contexts/withUserContext'

const SideNavBar = ({ visible, onToggleSideBarVisibility, userCtx, children }) => {
  return (
    <Sidebar.Pushable>
      
      <Sidebar as={Menu} animation='overlay' direction='top' vertical
            visible={visible} width='thin' icon='labeled' 
            style={{"borderRadius": ".28571429rem"}}>

        <Segment.Group basic="true">
          <Segment basic compact>
            <Button icon onClick={onToggleSideBarVisibility} 
                    circular compact inverted basic color="black" floated="right">
              <Icon name="remove" inverted basic="true" size="large" color="black" fitted />
            </Button>
          </Segment>
          
          <Segment basic compact>
            <Divider />
            <Grid columns={2} padded divided>
            {!userCtx.user.isAuthenticated && <Grid.Row>
              <Grid.Column textAlign="right">
                  <Link to="/register" key="register" onClick={onToggleSideBarVisibility}>
                    {intl.get("register-menu-header")}
                  </Link>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Link to="/login" key="login" onClick={onToggleSideBarVisibility}>
                    {intl.get("login-menu-header")}
                  </Link>
              </Grid.Column>
            </Grid.Row>}

            {userCtx.user.isAuthenticated && <Grid.Row columns={1}>
               <Grid.Column textAlign="center">
                    <Link to="/home" key="logout" onClick={onToggleSideBarVisibility}>
                      {intl.get("logout-menu-header")}
                    </Link>
                </Grid.Column>
              </Grid.Row>}
            </Grid>
          </Segment>
        </Segment.Group>
          
      </Sidebar>
      <Sidebar.Pusher>
        { children }
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

SideNavBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onToggleSideBarVisibility: PropTypes.func.isRequired,
  userCtx: PropTypes.object
};

export default withUser(SideNavBar);