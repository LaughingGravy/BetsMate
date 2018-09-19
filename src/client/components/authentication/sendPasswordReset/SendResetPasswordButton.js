import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import MutationButton from '../../common/MutationButton'
import SEND_RESET_PASSWORD_EMAIL from '../../../graphql/mutations/authentication/sendResetPasswordEmail'

const SendResetPasswordButton = ({ variables }) => {

  const label = "reset-button-label"

  const onCompleted = (data) => {
      history.push('/reset-password/success');
  }

  return (
    <Mutation mutation={SEND_RESET_PASSWORD_EMAIL} key={"SEND_RESET_PASSWORD_EMAIL"} 
      
      onCompleted={onCompleted}>
      {(sendResetPasswordEmail, { loading, error }) => (
        <MutationButton variables={variables} mutation={sendResetPasswordEmail} 
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