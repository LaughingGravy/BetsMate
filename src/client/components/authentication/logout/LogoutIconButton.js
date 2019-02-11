import React from 'react';

import { Icon, Button } from 'semantic-ui-react'
import { withLogoutButton } from './withLogoutButton'
import { SVG, ICONS } from '../../../../../static/svgHelper'

const LogoutIconButton = ({loading, logout}) => { 
  return (
    <Icon as={Button} loading={loading} onClick={(e) => { 
                                                          e.preventDefault()
                                                          logout() 
                                                        }}>
      <SVG path={ICONS.SIGNOUT.path} viewBox={ICONS.SIGNOUT.viewBox} width="10" height="10" />
    </Icon> 
  )
}
    // {!loading && <SVG path={ICONS.SIGNOUT.path} viewBox={ICONS.SIGNOUT.viewBox} width="24" height="24" 
    //       dataTip="Log out" onClick={(e) => { 
    //                                                   e.preventDefault()
    //                                                   logout()                      
    //                                         }} />}
    // {loading && <SVGSpinner path={ICONS.SIGNOUT.path} fill="white" viewBox={ICONS.MAIL.viewBox} width="10" height="10" />}


    // <Icon name="sign out" circular size='small' inverted loading={loading} data-tip="Log out"
    //                                 onClick={(e) => { 
    //                                                   e.preventDefault()
    //                                                   logout()                      
    //                                         }} />      

export default withLogoutButton(LogoutIconButton)
