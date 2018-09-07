import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import MutationButton from '../../common/MutationButton'
import REGISTER_LINK from '../../../graphql/mutations/authentication/registerLink'

const RegisterLinkButton = ({ variables }) => {

  const label = "reset-button-label"

  const onCompleted = (data) => {
      history.push('/register/link/success');
  }

  return (
    <Mutation mutation={REGISTER_LINK} key={"REGISTER_LINK"} 
      
      onCompleted={onCompleted}>
      {(registerLink, { loading, error }) => (
        <MutationButton variables={variables} mutation={registerLink} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

RegisterLinkButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired
  }).isRequired
}

export default RegisterLinkButton