import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import RESET_PASSWORD from '../../../graphql/mutations/authentication/resetPassword'

import MutationButton from '../../common/MutationButton'

const ResetPasswordButton = ({ variables }) => {

  const label = "save-button-label"

  const onCompleted = (data) => {
      history.push('/login');
  }

  return (
    <Mutation mutation={RESET_PASSWORD} key={"RESET_PASSWORD"} 
      
      onCompleted={onCompleted}>
      {(resetPassword, { loading, error }) => (
        <MutationButton variables={variables} mutation={resetPassword} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

ResetPasswordButton.propTypes = {
  variables: PropTypes.shape({
    token: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired
}

export default ResetPasswordButton