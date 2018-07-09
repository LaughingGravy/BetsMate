import React from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import { Container, Grid, GridColumn, Table, Flag, Button, Header, Segment } from 'semantic-ui-react'

import { history } from '../../../../../library/routing'
import { withUser } from '../../contexts/withUserContext'
import ALL_COUNTRIES from '../../../graphql/queries/administration/allCountries';

//import CountriesGrid from './CountriesGrid.bak'
import CountriesTable from './CountriesTable'

class CountriesPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    //this.onRowClick = this.onRowClick.bind(this)

    // this.state = {
    //   activeRows: []
    // }
  }

  handleCreate(e, data) {
    console.log()
    history.push('/administration/country/editcountry')
  }

  handleEdit(e, data) {
    history.push('/administration/country/editcountry')
  }

  handleDelete(e, data) {
    history.push(`/administration/country/createcountry`)
  }

  //onRowClick(key) {
    // this.setState({
    //   activeRows: [key]
    // })
   // console.log(key)
  //}

  //onRowClick(e, data) {
  //  console.log(e)
    // if (this.state.selectedRowKeys.some(r => r.code === data.code)) {
    //   this.state.selectedRowKeys
    // }
    // else {
    //   this.setState({
    //     selectedRowKeys: this.state.selectedRowKeys.filter(r => r.code !== data.code)
    //   })
    // }
    // data.active = !data.active
  //}

  // flagRenderer(code) {
  //   return (<Flag name={code} />)
  // }

  // rowRenderer(country) {
  //   const { code, name } = country

  //   return (<Table.Row key={code} textAlign='center' onClick={this.onRowClick}>
  //     <Table.Cell>{this.flagRenderer(code)}</Table.Cell>
  //     <Table.Cell>{code}</Table.Cell>
  //     <Table.Cell>{name}</Table.Cell>     
  //   </Table.Row>)
  // }

  

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

                    <CountriesTable data={countries} isMultiSelect={false} />

                    {/* <Table celled selectable stackable tableData={countries.map((c) => Object.assign({}, c, { active: true, onClick: this.onRowClick}))}
                      headerRow={headerRow} renderBodyRow={renderBodyRow} /> */}

{/* /*                   {/*   <Table celled selectable stackable headerRow={headerRow}> */}

                    {/* <Table celled selectable stackable> 
      
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
                        <Table.Row textAlign='center'>
                          <Table.Cell colSpan='3'>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                  <Button compact secondary onClick={this.handleCreate}>{intl.get("admin-create-button-label")}</Button>
                                  </td>
                                  <td>
                                  <Button compact secondary onClick={this.handleEdit}>{intl.get("admin-edit-button-label")}</Button>
                                  </td>
                                  <td>
                                  <Button compact secondary onClick={this.handleDelete}>{intl.get("admin-delete-button-label")}</Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                             <Segment.Group compact basic horizontal size='tiny'>
                              <Segment tertiary compact>
                                <Button compact secondary onClick={this.handleCreate}>{intl.get("admin-create-button-label")}</Button>
                              </Segment>
                              <Segment tertiary compact>
                                <Button compact secondary onClick={this.handleEdit}>{intl.get("admin-edit-button-label")}</Button>
                              </Segment>
                              <Segment tertiary compact>
                                <Button compact secondary onClick={this.handleDelete}>{intl.get("admin-delete-button-label")}</Button>
                              </Segment>
                            </Segment.Group> 
                          </Table.Cell>
                        </Table.Row>
                      </Table.Footer>

                    </Table>  */}

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