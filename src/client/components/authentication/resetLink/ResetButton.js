import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import MutationButton from '../../common/MutationButton'
import RESET_LINK from '../../../graphql/mutations/authentication/resetLink'

const RestButton = ({ variables }) => {

  const label = "reset-button-label"

  const onCompleted = (data) => {
      history.push('/resetsuccess');
  }

  return (
    <Mutation mutation={RESET_LINK} key={"RESET_LINK"} 
      
      onCompleted={onCompleted}>
      {(resetLink, { loading, error }) => (
        <MutationButton variables={variables} mutation={resetLink} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

RestButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired
  }).isRequired
}

export default RestButton