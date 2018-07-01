import React from 'react'
import { Table, Flag } from 'semantic-ui-react'
import CountriesRow from './CountriesRow';
import { withSelectableRowsTable } from '../../common/withSelectableRowsTable'

class CountriesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props
    const { activeRows } = this.props

    console.log("this.props", this.props)

    return (
      <Table celled selectable stackable>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Flag</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            data.map(c => {
            const isActive = activeRows[c.code]
            
            return(<CountriesRow active={isActive} 
                                  key={c.code}
                                  id={c.code}
                                  data={c}
                                  onRowClick={this.props.onRowClick}
                                  />
                
              )
            }
          )}
        </Table.Body>
      </Table>
    )
  }
}

export default withSelectableRowsTable(CountriesTable)



