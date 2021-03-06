import React from 'react'
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import InternationalisationItem from './InternationalisationItem'

import RightMenuItems from './RightMenuItems'
import SideBarMenuItem from './SideBarMenuItem'
import AdminMenuItem from './AdminMenuItem'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const MainBar = ({ locales, onSelectLocale, defaultLocale, onToggleSideBarVisibility}) => {

  return (
    <Menu attached secondary fluid>
    <Menu.Menu position="left">
      <Menu.Item key="home" onClick={e => history.push("/home")} style={{"display": "flex", "alignContent": "flexStart"}}>
          <SVG path={ICONS.FOOTBALL.path} viewBox={ICONS.FOOTBALL.viewBox} width="32" height="32" />
          <span> Bets Mate</span>
      </Menu.Item> 

      <AdminMenuItem />
    </Menu.Menu>

    
    <Menu.Menu fitted="true" position="right">  
      <InternationalisationItem locales={locales} onSelectLocale={onSelectLocale} defaultLocale={defaultLocale} />
      <RightMenuItems />
      <SideBarMenuItem onToggleSideBarVisibility={onToggleSideBarVisibility} />
    </Menu.Menu>
  </Menu>
  )}

  MainBar.propTypes = {
    locales: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectLocale: PropTypes.func.isRequired,
    defaultLocale: PropTypes.string,
    onToggleSideBarVisibility: PropTypes.func.isRequired
  }

export default MainBar