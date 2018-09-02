import React from 'react';
import { Mutation } from 'react-apollo'
import { compose } from 'recompose'

import { Loader, Segment } from 'semantic-ui-react'

import { history } from '../../../../library/routing'
import { renderIfAuthenticated } from '../common/ConditionalRender'
import { withUser } from '../contexts/withUserContext'
import LOGOUT from '../../graphql/mutations/authentication/logout'
import CURRENT_USER from '../../graphql/queries/authentication/currentUser'

const vanillaLogout = (props) => {

  const onCompleted = (data) => {
      history.push('/home');
  }

  return (
    <Mutation mutation={LOGOUT} key={"LOGOUT"} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(logout, { loading }) => (
          <span onClick={(e) => { 
                                  e.preventDefault()
                                  logout()
                        }}> 
              <Loader active={loading} inline="centered" />
              { props.children }
          </span>
      )}
    </Mutation>
  )
}

const Logout = compose(
  renderIfAuthenticated(vanillaLogout),
)(vanillaLogout)


export default withUser(Logout)
