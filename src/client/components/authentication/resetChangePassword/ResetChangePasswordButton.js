import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import RESET_CHANGE_PASSWORD from '../../../graphql/mutations/authentication/resetChangePassword'

import MutationButton from '../../common/controls/MutationButton'

const ResetChangePasswordButton = ({ variables, disabled }) => {
  const label = "save-button-label"

  const onCompleted = (data) => {
      history.push('/reset/change-password/success');
  }

  return (
    <Mutation mutation={RESET_CHANGE_PASSWORD} key={"RESET_CHANGE_PASSWORD"} 
      
      onCompleted={onCompleted}>
      {(resetChangePassword, { loading, error }) => (
        <MutationButton variables={variables} disabled={disabled} mutation={resetChangePassword} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

ResetChangePasswordButton.propTypes = {
  variables: PropTypes.shape({
    password: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired
}

export default ResetChangePasswordButton