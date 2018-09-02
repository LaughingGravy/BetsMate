import React from 'react';
import PropTypes from 'prop-types'

import { history } from '../../../../../library/routing'

const RestButton = ({ variables }) => {

  const label = "reset-button-label"

  const onCompleted = (data) => {
      history.push('/login');
  }

  return (
    <Mutation mutation={LOGIN} key={variables.email} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(login, { loading, error }) => (
        <MutationButton variables={variables} mutation={login} 
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