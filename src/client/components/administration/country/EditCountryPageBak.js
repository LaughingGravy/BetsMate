import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Grid, Container, GridColumn } from 'semantic-ui-react'
import { withApollo, compose } from 'react-apollo'
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

import { withUser } from '../../contexts/withUserContext'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/mergeCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'

import CountryForm from './CountryForm'

class EditCountryPageBak extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      code: props.match.params.code || "",
      countryName: "",
      error: "",
      loading: false
    }

    this.saveRecord = this.saveRecord.bind(this);
  }

  componentDidMount() {
    const { code } = this.state
    
    if (code !== "") {
      this.fetchRecord(code)
    }
  }
  
  fetchRecord = (code) => {
    this.props.client.query({
      query: GET_COUNTRY_BY_CODE,
      variables: { code: code },
    })
    .then(({ loading, error, data: { countryByCode } }) => {

      const { name } = countryByCode

      this.setState({
        countryName: name,
        loading: loading,
        error: error
      })

    })
  }

  onSavedRecord() {
    console.log("onSavedRecord")
    this.props.history.push('/administration/country/countries')
  }

  saveRecord() {
    const { code, countryName } = this.state

    this.props.client.mutate({
      mutation: { MERGE_COUNTRY },
      variables: { code: code, name: countryName }, 
      options: {
        update: (store, { data: mergeCountry }) => {
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
        },

        key: { code },

        onCompleted: this.onSavedRecord(),

        refetchQueries: [ {query: ALL_COUNTRIES} ]
      }     
    })
    .then(({ loading, error, data: { countryByCode } }) => {

      if (error) {
        this.setState({
          loading: loading,
          error: error
        })
      }

      this.onSavedRecord()
     
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { userCtx } = this.props
    const { code, countryName, loading, error } = this.state

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
            <h3>{intl.get("add-country-page-title")}</h3>
          </Grid.Row>

           {(userCtx.isAuthenticated && userCtx.user.role == 'admin') && 
         
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>
                  <CountryForm  code={code} countryName={countryName} loading={loading}
                                handleChange={this.handleChange}
                                onSubmit={e => {
                                            e.preventDefault             
                                            this.saveRecord()
                                          }} />
                  {error && <GraphQLErrorDisplay error={error} />}
                </GridColumn>
              </Grid.Row>
            }
        </Grid>
      </Container>
    )
  }
}

EditCountryPage.propTypes = {
  userCtx: PropTypes.object
};

export default compose(
  withApollo
)(withUser(EditCountryPageBak))