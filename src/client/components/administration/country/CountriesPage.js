import React from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import { Container, Grid, GridColumn, Table, Flag, Button } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import { withUser } from '../../contexts/withUserContext'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries';

class CountriesPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleCreateCountry = this.handleCreateCountry.bind(this)
  }

  handleCreateCountry(e, data) {
    const { setRoute } = this.props
    history.push('/administration/country/createcountry')
  }

  flagRenderer(code) {
    return (<Flag name={code} />)
  }

  rowRenderer(country) {
    const { code, name } = country

    return (<Table.Row key={code} textAlign='center'>
      <Table.Cell>{this.flagRenderer(code)}</Table.Cell>
      <Table.Cell>{code}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>     
    </Table.Row>)
  }

  render() {
    const { userCtx } = this.props

    return (
      <Container>
        <Grid columns={1} centered>

          <Grid.Row centered>
            <h3>{intl.get("countries-page-title")}</h3>
          </Grid.Row>

          {(!userCtx.isAuthenticated || userCtx.user.role != 'admin') && <Grid.Row centered>
            <p>You are not authorised to view this page.</p>
            </Grid.Row>}

          {(userCtx.isAuthenticated && userCtx.user.role == 'admin') &&  
            <Query query={ALL_COUNTRIES}>
              {({ loading, error, data: { countries }}) => {

                if (loading) {
                  return <div>loading...</div>;
                }

                if (!error && countries && !countries.length) {
                  return <Grid.Row centered>No data found.</Grid.Row>
                }

                return (
                <Grid.Row centered>
                  <GridColumn mobile={16} tablet={8} computer={4}>

                    <Table celled>
      
                      <Table.Header>
                        <Table.Row textAlign='center'>
                          <Table.HeaderCell>Code</Table.HeaderCell>
                          <Table.HeaderCell>Flag</Table.HeaderCell>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {countries.map(country => {
                              return this.rowRenderer(country)
                          }
                        )}
                      </Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.Cell colSpan='3' textAlign='right'>
                            <Button compact secondary onClick={this.handleCreateCountry}>{intl.get("create-country-button-label")}</Button>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Footer>

                    </Table>

                    {error && <GraphQLErrorDisplay error={error} />}
                  </GridColumn>
                </Grid.Row>
              )   
              }}
            </Query>}

        </Grid>
      </Container>
    )
  }
}

CountriesPage.propTypes = {
  userCtx: PropTypes.object.isRequired
};

export default withUser(CountriesPage)