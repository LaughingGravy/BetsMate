import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Container, Form } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/mergeCountry'

const SaveCountryButton = ({ code, countryName }) => {
  return (
    <Mutation mutation={MERGE_COUNTRY} key={code}
            onCompleted={history.push('/administration/country/countries')}

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

            refetchQueries={[ {query: ALL_COUNTRIES} ]}>
            {(mergeCountry, { loading, error }) => (
      
      <Container textAlign='center'>
        <Form.Button primary
                      onClick={e => { 
                                      e.preventDefault;
                                      mergeCountry({ variables: { code, countryName } })}}
                      loading={loading} 
                    >{intl.get("save-button-label")}
        </Form.Button>

        {error && <GraphQLErrorDisplay error={error} />}
      </Container>

      )}
    </Mutation>
  )
}

SaveCountryButton.propTypes = {
  code: PropTypes.string,
  countryName: PropTypes.string
};

export default SaveCountryButton