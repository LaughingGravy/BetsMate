import React from 'react'
import { Table, Flag } from 'semantic-ui-react'
import CountriesRow from './CountriesRowBAK';

class CountriesGridObsol extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRows: []
    }

    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(code, e) {
    const { activeRows } = this.state

    const nextRows = {
      ...activeRows,
      [code]: !activeRows[code]
    }

    this.setState({
      activeRows: nextRows
    })
  }

  render() {
    const { data } = this.props
    const { activeRows } = this.state

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
                                  onRowClick={this.onRowClick}
                                  />
                
              )
            }
          )}
        </Table.Body>
      </Table>
    )
  }
}

export default CountriesGridObsol



