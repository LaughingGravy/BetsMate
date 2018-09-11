import React from 'react'
import { compose } from 'recompose'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

import LOGOUT from '../../../graphql/mutations/authentication/logout'
import CURRENT_USER from '../../../graphql/queries/authentication/currentUser'

const withLogoutButton = (ButtonComponent) => {

  const vanillaLogoutButton = () => {
    const onCompleted = (data) => {
        history.push('/home');
    }
  
    return (
      <Mutation mutation={LOGOUT} key={"LOGOUT"} 
        
        onCompleted={onCompleted}
  
        refetchQueries={[ {query: CURRENT_USER}]}>
        {(logout, { loading }) => (
            <ButtonComponent loading={loading} logout={logout} />
        )}
      </Mutation>
    )
  }

  const LogoutButton = compose(
    renderIfAuthenticated(vanillaLogoutButton),
  )(vanillaLogoutButton)

  return withUser(LogoutButton)

}

export { withLogoutButton }