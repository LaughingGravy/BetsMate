import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import REGISTER from '../../../graphql/mutations/authentication/register'
import CURRENT_USER from '../../../graphql/queries/authentication/currentUser'

import MutationButton from '../../common/MutationButton'

const RegisterButton = ({ variables: { email, password, displayName, timeZone }, disabled, role }) => {

  const label = "register-button-label"

  const onCompleted = (data) => {
      history.push('/home');
  }

  return (
    <Mutation mutation={REGISTER} key={displayName} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(register, { loading, error }) => (
        <MutationButton variables={{ email: email, displayName: displayName, password: password, role: role, timeZone: timeZone }} mutation={register} 
                        loading={loading} error={error} label={label} disabled={disabled} />
    )}
    </Mutation>
  )
}

RegisterButton.defaultProps = {
  role: "user"
}

RegisterButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  role: PropTypes.string
};

export default RegisterButton