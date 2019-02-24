import React from 'react'
import { Table } from 'semantic-ui-react'
import { withRowSelection } from '../../../common/tableHocs/withRowSelection'
import { getFlag } from '../../../../../../static/flags/flagHelper'

const itemContainerStyle = {
  display: "flex",
  position: 'relative',
  alignItems: 'center'
}

const flagTextStyle = {
  marginLeft: "0.5em"
}

class StadiaRow extends React.Component {
  constructor(props) {
    super(props)
  }

  flagRenderer = (code) => {
    const filename = code.replace(" ", "-")
    return (getFlag(filename, 24, 18))
  }

  render() {
    const { data: { stadiumId, name, city, country }, active, onClick } = this.props
    
    return (
      <Table.Row textAlign='center' active={active} onClick={onClick} key={stadiumId}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{city}</Table.Cell> 
        <Table.Cell textAlign="left"><div style={itemContainerStyle}>{this.flagRenderer(country.code)}<span style={flagTextStyle}></span>{country.name}</div></Table.Cell>  
      </Table.Row>
    )
  }
}

export default withRowSelection(StadiaRow)