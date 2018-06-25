import React from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import { Container, Grid, GridColumn, Table, Flag } from 'semantic-ui-react'

import { withUser } from '../../contexts/withUserContext'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries';

const CountriesPage = ({ userCtx }) => {

  const flagRenderer = (code) => {
    return (<Flag name={code} />)
  }

  const rowRenderer = (country) => {
    const { code, name } = country

    return (<Table.Row key={code}>
      <Table.Cell>{code}</Table.Cell>
      <Table.Cell>{flagRenderer(code)}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>     
    </Table.Row>)
  }

  return (
    <Container>
      <Grid columns={1} centered>

        <Grid.Row centered>
          <h2>{intl.get("countries-page-title")}</h2>
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
              else {
                console.log("countries", countries)
              }

              return (
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>

                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>Flag</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {countries.map(country => {
                            return rowRenderer(country)
                        }
                      )}
                    </Table.Body>

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

CountriesPage.propTypes = {
  userCtx: PropTypes.object
};

export default withUser(CountriesPage)