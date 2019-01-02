import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../../library/routing'
import MutationButton from '../../../common/controls/MutationButton'
import ALL_STADIA from '../../../../graphql/queries/administration/stadium/allStadia'
import GET_STADIUM from '../../../../graphql/queries/administration/stadium/getStadiumById'
import MERGE_STADIUM from '../../../../graphql/mutations/administration/stadium//mergeStadium'
import CREATE_STADIUM from '../../../../graphql/mutations/administration/stadium//createStadium'

const SaveStadiumButton = ({ variables, isEdit, disabled }) => {
  const { stadiumId, name, city, country } = variables
  const label = "save-button-label"

  const onCompleted = (data) => {
    history.push('/administration/stadium/stadia')
  }

  return (
    <Mutation mutation={isEdit? MERGE_STADIUM : CREATE_STADIUM} key={stadiumId} 

      onCompleted={onCompleted}

      update={(store) => {
        if (!isEdit) return;
        
        const getStadiumData = store.readQuery({
          query: GET_STADIUM, 
          variables: {
            stadiumId: stadiumId
          }}
        )

        if (getStadiumData) {
          const { getStadium } = getStadiumData
          getStadium.name = name
          getStadium.code = city
          getStadium.country = country
          
          store.writeQuery({
            query: GET_STADIUM, 
            variables: {
              stadiumId: stadiumId
            },
            data: {getStadium: getStadium}
          })
        }
      }}

      refetchQueries={[ {query: ALL_STADIA} ]}>
      {(mutation, { loading, error }) => (
          <MutationButton variables={{stadiumId, name, city, country}} mutation={mutation} loading={loading}
                          disabled={disabled} error={error} label={label} />
      )}
    </Mutation>
  )
}

SaveStadiumButton.propTypes = {
  variables: PropTypes.shape({
    stadiumId: PropTypes.string,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  isEdit: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default SaveStadiumButton