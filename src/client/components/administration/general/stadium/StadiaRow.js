import React from 'react'
import { Table, Flag } from 'semantic-ui-react'
import { withRowSelection } from '../../../common/withRowSelection'

class StadiaRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data: { id, name, city, countryName }, active, onClick } = this.props
    
    return (
      <Table.Row textAlign='center' active={active} onClick={onClick} key={id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{city}</Table.Cell> 
        <Table.Cell>{countryName}</Table.Cell>  
      </Table.Row>
    )
  }
}

export default withRowSelection(StadiaRow)