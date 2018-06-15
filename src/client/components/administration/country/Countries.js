import React from 'react';
import { Query } from 'react-apollo';
import { Container, Grid, Table, Flag } from 'semantic-ui-react'

import { withUser } from '../../contexts/userContext'
import ALL_COUNTRIES from '../../graphql/queries/allCountries';


const CountriesPage = ({ userCtx }) => {

  const flagRenderer = (item) => <Flag name={item.code} />

  const rowRenderer = (item) => 
    <Table.Row key={item.code}>
      <Table.Cell>{flagRenderer(item)}</Table.Cell>
      <Table.Cell>{item.code}</Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>     
    </Table.Row>

  return (
    <Container>
      <Grid columns={1} centered>

        <Grid.Row centered>
          <h1>{intl.get("countries-page-title")}</h1>
        </Grid.Row>

        {(!userCtx.isAuthenticated || userCtx.user.role != 'admin') && <Grid.Row centered>
          <p>You are not authorised to view this page.</p>
          </Grid.Row>}

        {(userCtx.isAuthenticated && userCtx.user.role == 'admin') &&  <Query query={ALL_COUNTRIES}>
            {({ loading, error, data: { countries }}) => {

              if (loading) return null

              return (
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>

                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {countries.map(country => 
                        rowRenderer(country))}
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

export default withUser(CountriesPage)