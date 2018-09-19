import React from 'react';
import { Button } from 'semantic-ui-react'
import intl from 'react-intl-universal'

import { withLogoutButton } from './withLogoutButton'

const LogoutPlainButton = ({loading, logout}) => (
  <Button size="mini" basic compact secondary loading={loading} 
            onClick={(e) => { 
                        e.preventDefault()
                        logout()                      
                    }}> 
  {intl.get("logout-menu-header")}          
</Button>   
)

export default withLogoutButton(LogoutPlainButton)