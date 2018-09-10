import React from 'react'
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import InternationalisationItem from './InternationalisationItem'
import RightMenuUnAuthItems from './RightMenuUnAuthItems'
import RightMenuLogoutItem from './RightMenuLogoutItem'
import SideBarMenuItem from './SideBarMenuItem'
import AdminMenuItem from './AdminMenuItem'

const MainBar = ({ locales, onSelectLocale, defaultLocale, onToggleSideBarVisibility}) => {

  return (
    <Menu attached secondary>
    <Menu.Menu position="left">
      <Menu.Item key="home" onClick={e => history.push("/home")}>
        <Icon name="soccer" size="large"  />
        <span>Bets Mate</span>
      </Menu.Item> 

      <AdminMenuItem />
    </Menu.Menu>

    
    <Menu.Menu fitted="true" position="right">  
      <InternationalisationItem locales={locales} onSelectLocale={onSelectLocale} defaultLocale={defaultLocale} />
      <RightMenuUnAuthItems />
      <RightMenuLogoutItem /> 
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