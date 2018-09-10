import React from 'react'
import PropTypes from 'prop-types';

import { Sidebar, Menu, Button, Icon, Segment, Grid, Divider } from 'semantic-ui-react'

import UnAuthItemsGridRow from './UnAuthItemsGridRow'
import AuthItemsGridRow from './AuthItemsGridRow'

const SideNavBar = ({ visible, onToggleSideBarVisibility, children }) => {
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
              <UnAuthItemsGridRow onToggleSideBarVisibility={onToggleSideBarVisibility} />
              <AuthItemsGridRow onToggleSideBarVisibility={onToggleSideBarVisibility} />
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
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SideNavBar