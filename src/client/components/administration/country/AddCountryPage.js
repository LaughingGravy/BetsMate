import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Grid, Container, GridColumn } from 'semantic-ui-react'
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

import CREATE_COUNTRY from '../../../graphql/mutations/administration/createCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries'

class AddCountry extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      code: "",
      name: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onSavedCountry(data) {
    history.push('/administration/country/countries')
  }

  render() {

    const { code, name } = this.state

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
            <h1>{intl.get("add-country-page-title")}</h1>
          </Grid.Row>

           {(props.userCtx.isAuthenticated && props.userCtx.user.role == 'admin') && 
           <Mutation mutation={CREATE_COUNTRY}
            onSavedCountry={this.onSavedCountry}
            refetchQueries={[ {query: ALL_COUNTRIES}]}>
            {(createCountry, { loading, error, data }) => ( 
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>
                  <Form className='segment' onSubmit={e => {
                    e.preventDefault;
                    createCountry({ variables: { code, name } })
                  }}>
                    <Form.Field required>
                      <Form.Input name='code' label={intl.get("country-code-label")} 
                              placeholder={intl.get("country-code-placeholder")} onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field required>
                      <Form.Input name='country' label={intl.get("country-name-label")} 
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

export default AddCountry