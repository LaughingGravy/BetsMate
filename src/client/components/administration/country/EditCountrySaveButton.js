
import React from 'react';
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'
import { Query } from 'react-apollo'

import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

import MERGE_COUNTRY from '../../../graphql/mutations/administration/mergeCountry'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries'

const EditCountrySaveButton = ({ code, countryName }) => {
  return (
    <Mutation mutation={MERGE_COUNTRY} key={code}

      onCompleted={this.props.history.push('/administration/country/countries')}

      update={(store, { data: mergeCountry }) => {
        const data = store.readQuery({
          query: GET_COUNTRY_BY_CODE, 
          variables: {
            code: code
          }
        })
        
        const { countryByCode } = data
        countryByCode.code = code
        countryByCode.name = countryName
        
        store.writeQuery({
          query: GET_COUNTRY_BY_CODE, 
          variables: {
            code: code
          },
          data: {countryByCode: countryByCode}
        })
      }}

      refetchQueries={[ {query: ALL_COUNTRIES} ]}
      >
        {(mergeCountry, { loading, error, data }) => ( 
          <React.Fragment>
          <Form.Button primary loading={loading} 
                        onClick={e => {
                                        e.preventDefault;
                                        mergeCountry({ variables: { code, countryName } })
          }}>{intl.get("save-button-label")}</Form.Button>
          {error && <GraphQLErrorDisplay error={error} />}
          </React.Fragment>
        )}
      </Mutation>
  )
}

export default EditCountrySaveButton