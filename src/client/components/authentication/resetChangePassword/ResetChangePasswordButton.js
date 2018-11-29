import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import RESET_CHANGE_PASSWORD from '../../../graphql/mutations/authentication/resetChangePassword'

import MutationButton from '../../common/MutationButton'

const ResetChangePasswordButton = ({ variables }) => {

  const label = "save-button-label"

  const onCompleted = (data) => {
      history.push('/change-password/success');
  }

  return (
    <Mutation mutation={RESET_CHANGE_PASSWORD} key={"RESET_CHANGE_PASSWORD"} 
      
      onCompleted={onCompleted}>
      {(resetChangePassword, { loading, error }) => (
        <MutationButton variables={variables} mutation={resetChangePassword} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

ResetChangePasswordButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired
  }).isRequired
}

export default ResetChangePasswordButton