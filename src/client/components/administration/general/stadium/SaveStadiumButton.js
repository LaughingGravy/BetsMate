import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../../library/routing'
import MutationButton from '../../../common/MutationButton'
import ALL_STADIA from '../../../../graphql/queries/administration/stadium/allStadia'
import GET_STADIUM from '../../../../graphql/queries/administration/stadium/getStadium'
import MERGE_STADIUM from '../../../../graphql/mutations/administration/stadium//mergeStadium'
import CREATE_STADIUM from '../../../../graphql/mutations/administration/stadium//createStadium'

const SaveStadiumButton = ({ id, name, city , countryId, disabled }) => {

  const label = "save-button-label"

  const onCompleted = (data) => {
    history.push('/administration/stadium/stadia')
  }

  return (
    <Mutation mutation={!id ? MERGE_STADIUM : CREATE_STADIUM} key={id} 

      onCompleted={onCompleted}

      update={(store) => {
        
        const getStadiumData = store.readQuery({
          query: GET_STADIUM, 
          variables: {
            id: id
          }}
        )

        if (getStadiumData) {
          const { getStadium } = getStadiumData
          getStadium.code = id
          getStadium.name = name
          getStadium.code = city
          getStadium.name = countryId
          
          store.writeQuery({
            query: GET_STADIUM, 
            variables: {
              id: id
            },
            data: {getStadium: getStadium}
          })
        }
      }}

      refetchQueries={[ {query: ALL_STADIA} ]}>
      {(mutation, { loading, error }) => (
          <MutationButton variables={{id: id, name: name, city: city, countryId}} mutation={mutation} loading={loading}
                          disabled={disabled} error={error} label={label} />
      )}
    </Mutation>
  )
}

SaveStadiumButton.propTypes = {
  variables: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    countryId: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired
};

export default SaveStadiumButton