import React from 'react'
import { Table, Flag } from 'semantic-ui-react'
import { withRowSelection } from '../../../common/withRowSelection'

class StadiaRow extends React.Component {
  constructor(props) {
    super(props)
  }

  countryRenderer = item => <span><Flag name={item.code} />{item.name}</span>

  render() {
    const { data: { stadiumId, name, city, country }, active, onClick } = this.props
    
    return (
      <Table.Row textAlign='center' active={active} onClick={onClick} key={stadiumId}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{city}</Table.Cell> 
        <Table.Cell>{this.countryRenderer(country)}</Table.Cell>  
      </Table.Row>
    )
  }
}

export default withRowSelection(StadiaRow)