import React from 'react'
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import InternationalisationItem from './InternationalisationItem'
import RightMenuUnAuthItems from './RightMenuUnAuthItems'
import RightMenuLogoutItem from './RightMenuLogoutItem'

const MainBar = ({ locales, onSelectLocale, defaultLocale}) => {

  return (
    <Menu attached secondary>
    <Menu.Menu position="left">
      <Menu.Item key="home" onClick={e => history.push("/home")}>
        <Icon name="soccer" size="large"  />
        <span>Bets Mate</span>
      </Menu.Item>  
    </Menu.Menu>

    
    <Menu.Menu fitted="true" position="right">  
      <InternationalisationItem locales={locales} onSelectLocale={onSelectLocale} defaultLocale={defaultLocale} />
      <RightMenuUnAuthItems />
      <RightMenuLogoutItem />     
    </Menu.Menu>
  </Menu>
  )}

  MainBar.propTypes = {
    locales: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectLocale: PropTypes.func.isRequired,
    defaultLocale: PropTypes.string,
  }

export default MainBar