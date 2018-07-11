import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Grid, Container, GridColumn } from 'semantic-ui-react'
import { history } from '../../../../../library/routing'
import { Mutation, withApollo, graphql, compose } from 'react-apollo'
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

import { withUser } from '../../contexts/withUserContext'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/mergeCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'

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

    console.log("this.state", this.state)
    
    if (isEdit === true && code !== "") {
      this.fetchRecord(code)
    }
  }

  handleCodeRef = (c) => {
    this.codeRef = c
  }

  handleCountryNameRef = (c) => {
    this.countryNameRef = c
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
           <Mutation mutation={MERGE_COUNTRY}
            onCompleted={this.onSavedCountry}
            refetchQueries={[ {query: ALL_COUNTRIES}, {query: GET_COUNTRY_BY_CODE, variables: {code: code}}]}>
            {(mergeCountry, { loading, error, data }) => ( 
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>
                  <Form className='segment' onSubmit={e => {
                    e.preventDefault             
                    mergeCountry({ variables: { code: code, name: countryName } })
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
                    </Container>
                  </Form>
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