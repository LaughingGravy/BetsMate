import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import REGISTER from '../../../graphql/mutations/authentication/register'
import CURRENT_USER from '../../../graphql/queries/authentication/currentUser'

import MutationButton from '../../common/MutationButton'

const RegisterButton = ({ email, password, role }) => {

  const label = "register-button-label"

  const onCompleted = (data) => {
    if (history.length > 0)
      history.goBack()
    else
      history.push('/home');
  }

  return (
    <Mutation mutation={REGISTER} key={email} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(signup, { loading, error }) => (
        <MutationButton variables={{email: email, password: password, role: role}} mutation={signup} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

RegisterButton.defaultProps = {
  role: "user"
}

RegisterButton.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};

export default RegisterButton