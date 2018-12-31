import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../../library/routing'
import MutationButton from '../../../common/MutationButton'
import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'
import GET_COUNTRY_BY_CODE from '../../../../graphql/queries/administration/country/getCountryByCode'
import MERGE_COUNTRY from '../../../../graphql/mutations/administration/country/mergeCountry'
import CREATE_COUNTRY from '../../../../graphql/mutations/administration/country/createCountry'

const SaveCountryButton = ({ variables , disabled }) => {
  const { code, name } = variables

  const label = "save-button-label"

  const onCompleted = (data) => {
    history.push('/administration/general/country/countries')
  }

  //need to know if this is an update or an insert

  return (
    <Mutation mutation={!code ? CREATE_COUNTRY : MERGE_COUNTRY } key={code} 

      onCompleted={onCompleted}

      update={(store) => {
        
        let getCountryByCodeData = store.readQuery({
          query: GET_COUNTRY_BY_CODE, 
          variables: {
            code: code
          }}
        )

        console.log("getCountryByCodeData", getCountryByCodeData)

        if (getCountryByCodeData) {
          const { countryByCode } = getCountryByCodeData
          countryByCode.code = code
          countryByCode.name = name
          
          store.writeQuery({
            query: GET_COUNTRY_BY_CODE, 
            variables: {
              code: code
            },
            data: {countryByCode: countryByCode}
          })
        }
      }}

      refetchQueries={[ {query: ALL_COUNTRIES} ]}>
      {(mergeCountry, { loading, error }) => (
          <MutationButton variables={{code: code, name: name}} mutation={mergeCountry} loading={loading}
                          disabled={disabled} error={error} label={label} />
      )}
    </Mutation>
  )
}

SaveCountryButton.propTypes = {
  variables: PropTypes.shape({
    id: PropTypes.string,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired
};

export default SaveCountryButton