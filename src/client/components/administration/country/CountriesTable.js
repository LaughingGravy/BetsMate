import React from 'react'
import { Table } from 'semantic-ui-react'
import CountriesRow from './CountriesRow';
import { withSelectableRowsTable } from '../../common/withSelectableRowsTable'
import AdminTableButtonGroup from '../controls/AdminTableButtonGroup'

class CountriesTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, activeRows, onRowClick, handleCreate, handleEdit, handleDelete } = this.props

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
                                  onRowClick={onRowClick}
                                  />
                
              )
            }
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row textAlign='center'>
            <Table.Cell colSpan='3'>
              <AdminTableButtonGroup handleCreate={handleCreate} handleEdit={handleEdit} 
                                      handleDelete={handleDelete} activeRows={activeRows} />
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default withSelectableRowsTable(CountriesTable)



