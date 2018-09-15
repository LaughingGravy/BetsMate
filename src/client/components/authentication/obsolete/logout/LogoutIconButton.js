import React from 'react';
import { Icon } from 'semantic-ui-react'

import { withLogoutButton } from './withLogoutButton'

const LogoutIconButton = ({loading, logout}) => { 
  return (
    <Icon name="sign out" circular size='small' inverted loading={loading} data-tip="Log out"
                                    onClick={(e) => { 
                                                      e.preventDefault()
                                                      logout()                      
                                            }} />      
  )
}

export default withLogoutButton(LogoutIconButton)
