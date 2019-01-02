import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import CHANGE_PASSWORD from '../../../graphql/mutations/authentication/changePassword'

import MutationButton from '../../common/controls/MutationButton'

const ChangePasswordButton = ({ variables, disabled }) => {
  const label = "save-button-label"

  const onCompleted = (data) => {
      history.push('/change-password/success');
  }

  return (
    <Mutation mutation={CHANGE_PASSWORD} key={"CHANGE_PASSWORD"} 
      
      onCompleted={onCompleted}>
      {(changePassword, { loading, error }) => (
        <MutationButton variables={variables} disabled={disabled} mutation={changePassword} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

ChangePasswordButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired
  }).isRequired,
  disabled: PropTypes.bool.isRequired
}

export default ChangePasswordButton