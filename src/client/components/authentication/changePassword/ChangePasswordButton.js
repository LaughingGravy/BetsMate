import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import CHANGE_PASSWORD from '../../../graphql/mutations/authentication/changePassword'

import MutationButton from '../../common/MutationButton'

const ChangePasswordButton = ({ variables }) => {

  const label = "save-button-label"

  const onCompleted = (data) => {
      history.push('/changesuccess');
  }

  return (
    <Mutation mutation={CHANGE_PASSWORD} key={"CHANGE_PASSWORD"} 
      
      onCompleted={onCompleted}>
      {(changePassword, { loading, error }) => (
        <MutationButton variables={variables} mutation={changePassword} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

ChangePasswordButton.propTypes = {
  variables: PropTypes.shape({
    password: PropTypes.string.isRequired
  }).isRequired
}

export default ChangePasswordButton