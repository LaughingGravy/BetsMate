import React from 'react';
import PropTypes from 'prop-types'

import { history } from '../../../../../library/routing'
import RESET from '../../../graphql/mutations/authentication/reset'

const RestButton = ({ variables }) => {

  const label = "reset-button-label"

  const onCompleted = (data) => {
      history.push('/login');
  }

  return (
    <Mutation mutation={RESET} key={"RESET"} 
      
      onCompleted={onCompleted}>
      {(reset, { loading, error }) => (
        <MutationButton variables={variables} mutation={reset} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

RestButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired
}

export default RestButton