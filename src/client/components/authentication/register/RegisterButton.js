import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import REGISTER from '../../../graphql/mutations/authentication/register'
import CURRENT_USER from '../../../graphql/queries/authentication/currentUser'

import MutationButton from '../../common/MutationButton'

const RegisterButton = ({ variables: { token, displayName, password }, role }) => {

  const label = "register-button-label"

  const onCompleted = (data) => {
      history.push('/home');
  }

  return (
    <Mutation mutation={REGISTER} key={displayName} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(signup, { loading, error }) => (
        <MutationButton variables={{token: token, displayName: displayName, password: password, role: role}} mutation={signup} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

RegisterButton.defaultProps = {
  role: "user"
}

RegisterButton.propTypes = {
  variables: PropTypes.shape({
    token: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string
};

export default RegisterButton