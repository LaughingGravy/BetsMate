import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import MutationButton from '../../common/MutationButton'
import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/country/getCountryByCode'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/country/mergeCountry'

const SaveCountryButton = ({ code, name }) => {

  const label = "save-button-label"

  const onCompleted = (data) => {
    history.push('/administration/country/countries')
  }

  return (
    <Mutation mutation={MERGE_COUNTRY} key={code} 

      onCompleted={onCompleted}

      update={(store) => {
        
        const getCountryByCodeData = store.readQuery({
          query: GET_COUNTRY_BY_CODE, 
          variables: {
            code: code
          }}
        )

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
          <MutationButton variables={{code: code, name: name}} mutation={mergeCountry} loading={loading} error={error} label={label} />
      )}
    </Mutation>
  )
}

SaveCountryButton.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SaveCountryButton