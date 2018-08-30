import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../library/routing'
import LOGIN from '../../graphql/mutations/authentication/login'
import CURRENT_USER from '../../graphql/queries/authentication/currentUser'

import MutationButton from '../common/MutationButton'

const LoginButton = ({ email, password }) => {

  const label = "login-button-label"

  const onCompleted = (data) => {
    if (history.length > 0)
      history.goBack()
    else
      history.push('/home');
  }

  return (
    <Mutation mutation={LOGIN} key={email} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(login, { loading, error }) => (
        <MutationButton variables={{email: email, password: password}} mutation={login} loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

LoginButton.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginButton