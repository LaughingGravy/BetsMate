import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Grid, Container, GridColumn } from 'semantic-ui-react'
import { history } from '../../../../../library/routing'
import { Mutation, withApollo, compose } from 'react-apollo'
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

import { withUser } from '../../contexts/withUserContext'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/mergeCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'

import CountryForm from './CountryForm'

class EditCountryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      code: props.match.params.code || "",
      countryName: "",
      isEdit: props.match.params.code.length > 0
    }
  }

  componentDidMount() {
    const { code, isEdit } = this.state
    
    if (isEdit === true && code !== "") {
      this.fetchRecord(code)
    }
  }
  
  fetchRecord = (code) => {
    this.props.client.query({
      query: GET_COUNTRY_BY_CODE,
      variables: { code: code },
    })
    .then(({ loading, error, data: { countryByCode } }) => {

      if (countryByCode != null) {
        const { name } = countryByCode

        this.setState({
          countryName: name
        })
      }
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onSavedCountry(data) {
    history.push('/administration/country/countries')
  }

  render() {
    const { userCtx } = this.props
    const { code, countryName, isEdit } = this.state

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
            <h3>{intl.get("add-country-page-title")}</h3>
          </Grid.Row>

           {(userCtx.isAuthenticated && userCtx.user.role == 'admin') && 
           <Mutation mutation={MERGE_COUNTRY} key={code}
            onCompleted={this.onSavedCountry}
            refetchQueries={[ {query: ALL_COUNTRIES}, {query: GET_COUNTRY_BY_CODE, variables: {code: code}}]}>
            {(mergeCountry, { loading, error, data }) => ( 
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>
                  <CountryForm  code={code} countryName={countryName} loading={loading}
                                handleChange={this.handleChange}
                                onSubmit={e => {
                                            e.preventDefault             
                                            mergeCountry({ variables: { code: code, name: countryName } })
                                          }} />
                  {error && <GraphQLErrorDisplay error={error} />}
                </GridColumn>
              </Grid.Row>
            )}
          </Mutation>}

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
)(withUser(EditCountryPage))