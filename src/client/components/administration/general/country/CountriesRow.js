import React from 'react'
import { Table } from 'semantic-ui-react'
import { withRowSelection } from '../../../common/tableHocs/withRowSelection'
import { getFlag } from '../../../../../../static/flags/flagHelper'

class CountriesRow extends React.Component {
  constructor(props) {
    super(props)
  }

  flagRenderer = (code) => {
    const filename = code.replace(" ", "-")
    return (getFlag(filename, 24, 18))
  }

  render() {
    const { data: { id, code, name }, active, onClick } = this.props
    
    return (
      <Table.Row textAlign='center' active={active} onClick={onClick} key={id}>
        <Table.Cell>{this.flagRenderer(code)}</Table.Cell>
        <Table.Cell>{code}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>     
      </Table.Row>
    )
  }
}

export default withRowSelection(CountriesRow)