import React from 'react';
import { Mutation } from 'react-apollo'
import { compose } from 'recompose'
import intl from 'react-intl-universal';

import { Button } from 'semantic-ui-react'
import { history } from '../../../../library/routing'
import { renderIfAuthenticated } from '../common/ConditionalRender'
import { withUser } from '../contexts/withUserContext'
import LOGOUT from '../../graphql/mutations/authentication/logout'
import CURRENT_USER from '../../graphql/queries/authentication/currentUser'

const vanillaLogoutButton = () => {

  const onCompleted = (data) => {
      history.push('/home');
  }

  return (
    <Mutation mutation={LOGOUT} key={"LOGOUT"} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(logout, { loading }) => (
          <Button size="mini" basic compact secondary loading={loading} onClick={(e) => { 
                                  e.preventDefault()
                                  logout()                      
                        }}> 
            {intl.get("logout-menu-header")}          
          </Button>
      )}
    </Mutation>
  )
}

const LogoutButton = compose(
  renderIfAuthenticated(vanillaLogoutButton),
)(vanillaLogoutButton)


export default withUser(LogoutButton)
