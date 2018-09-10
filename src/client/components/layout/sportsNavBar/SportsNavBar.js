import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Container, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import intl from 'react-intl-universal';

const SportsNavBar = () => {
  return (

    <Menu attached fluid secondary widths={1}>

          <Menu.Item as={NavLink} compact="true" key="soccer1" to="/football" activeClassName="active">
            <Icon name="soccer" size="large"  />
            <span>{intl.get("sport-football-header")}</span>
          </Menu.Item>

          {/* <Menu.Item as={NavLink} compact="true" to="/about" key="about3" activeClassName="active" position="right">
            <Icon name="info" circular size="small" />
          </Menu.Item> */}

    </Menu>
  )
}

export default SportsNavBar