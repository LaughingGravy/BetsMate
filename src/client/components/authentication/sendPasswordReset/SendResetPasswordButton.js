import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import MutationButton from '../../common/controls/MutationButton'
import SEND_RESET_PASSWORD from '../../../graphql/mutations/authentication/sendPasswordReset'

const SendResetPasswordButton = ({ variables, disabled }) => {

  const label = "reset-button-label"

  const onCompleted = (data) => {
      history.push('/reset-password/success');
  }

  return (
    <Mutation mutation={SEND_RESET_PASSWORD} key={"SEND_RESET_PASSWORD"} 
      
      onCompleted={onCompleted}>
      {(sendResetPasswordEmail, { loading, error }) => (
        <MutationButton variables={variables} disabled={disabled} mutation={sendResetPasswordEmail} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

SendResetPasswordButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired
  }).isRequired
}

export default SendResetPasswordButton