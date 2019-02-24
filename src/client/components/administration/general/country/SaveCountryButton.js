import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../../library/routing'
import MutationButton from '../../../common/controls/MutationButton'
import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'
import GET_COUNTRY_BY_CODE from '../../../../graphql/queries/administration/country/getCountryByCode'
import MERGE_COUNTRY from '../../../../graphql/mutations/administration/country/mergeCountry'
import CREATE_COUNTRY from '../../../../graphql/mutations/administration/country/createCountry'

const SaveCountryButton = ({ variables, isEdit, disabled }) => {
  const { code, name } = variables

  const label = "save-button-label"

  const onCompleted = (data) => {
    history.push('/administration/general/country/countries')
  }

  return (
    <Mutation mutation={isEdit? MERGE_COUNTRY : CREATE_COUNTRY } key={code} 

      onCompleted={onCompleted}

      update={(store) => {

        if (!isEdit) return;
        
        let getCountryByCodeData = store.readQuery({
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
      {(mutation, { loading, error }) => (
          <MutationButton variables={variables} mutation={mutation} loading={loading}
                          disabled={disabled} error={error} label={label} />
      )}
    </Mutation>
  )
}

SaveCountryButton.propTypes = {
  variables: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isEdit: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default SaveCountryButton