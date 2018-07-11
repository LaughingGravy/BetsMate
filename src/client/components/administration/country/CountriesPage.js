import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import { withUser } from '../../contexts/withUserContext'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries';

import CountriesTable from './CountriesTable'

class CountriesPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleCreate(e, data) {
    history.push('/administration/country/editcountry')
  }

  handleEdit(e, data) {
    if (!Object.entries(data) || Object.entries(data).length === 0)
      return

    const code = Object.entries(data).shift()[0]
    history.push(`/administration/country/editcountry/${code}`)
  }

  handleDelete(e, data) {
    history.push(`/administration/country/deletecountry`)
  }

  render() {
    const { userCtx } = this.props

    return (
        <Grid columns={1} centered>

          <Grid.Row centered>
            <Header as='h3' textAlign="center">{intl.get("countries-page-title")}</Header>
          </Grid.Row>

          {(!userCtx.isAuthenticated || userCtx.user.role != 'admin') && <Grid.Row centered textAlign="center">
            You are not authorised to view this page.
            </Grid.Row>}

          {(userCtx.isAuthenticated && userCtx.user.role == 'admin') &&  
            <Query query={ALL_COUNTRIES}>
              {({ loading, error, data: { countries }}) => {

                if (loading) {
                  return <Container textAlign="center">loading...</Container>;
                }

                if (!error && countries && !countries.length) {
                  return <Grid.Row centered>No data found.</Grid.Row>
                }

                return (
                <Grid.Row centered>
                  <GridColumn>

                    <CountriesTable data={countries} isMultiSelect={false} 
                                    handleCreate={this.handleCreate}
                                    handleEdit={this.handleEdit}
                                    handleDelete={this.handleDelete} />
                    {error && <GraphQLErrorDisplay error={error} />}

                  </GridColumn>
                </Grid.Row>
              )   
              }}
            </Query>}

        </Grid>
    )
  }
}

CountriesPage.propTypes = {
  userCtx: PropTypes.object.isRequired
};

export default withUser(CountriesPage)