
import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Form, Container } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'

import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/country/mergeCountry'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/country/getCountryByCode'

class CountryForm  extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { 
      code: props.code,
      countryName: props.countryName
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onCompleted = (data) => {
    history.push('/administration/country/countries')
  }

  render() {
    const { code, countryName } = this.state

    return (
      <Mutation mutation={MERGE_COUNTRY} 
        key={code}

        onCompleted={this.onCompleted}

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
          {(mergeCountry, { loading, error, data }) => (

          <Form className='segment' onSubmit={e => {                      
                                                      e.preventDefault() 
                                                      const name = countryName
                                                      mergeCountry({ variables: { code, name } })
                                                  }}>
            <Form.Field required>
              <Form.Input name='code' value={code} label={intl.get("country-code-label")} 
                      placeholder={intl.get("country-code-placeholder")} onChange={this.handleChange} />
            </Form.Field>

            <Form.Field required>
              <Form.Input name='countryName' value={countryName} label={intl.get("country-name-label")} 
                      placeholder={intl.get("country-name-placeholder")} onChange={this.handleChange} />
            </Form.Field>
            <Container textAlign='center'>
              <Form.Button primary loading={loading}>{intl.get("save-button-label")}</Form.Button>
              {error && <GraphQLErrorDisplay error={error} />}
            </Container>
          </Form>
          )}
      </Mutation>
    ) 
  } 
}

CountryForm.propTypes = {
  code: PropTypes.string,
  countryName: PropTypes.string
};

export default CountryForm