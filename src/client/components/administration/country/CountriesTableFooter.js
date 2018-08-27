import React from 'react'
import { Table } from 'semantic-ui-react'

import CountryTableButtonGroup from './CountryTableButtonGroup'

class CountriesTableFooter extends React.PureComponent {
  constructor(props) {
    super(props)

    this.createNavigate = this.createNavigate.bind(this)
    this.editNavigate = this.editNavigate.bind(this)
  }

  createNavigate = (e, data) => history.push('/administration/country/editcountry')

  editNavigate = (e, data) => {
    if (!Object.entries(data) || Object.entries(data).length === 0)
        return
  
      const code = Object.entries(data).shift()[0]
      history.push(`/administration/country/editcountry/${code}`)
  }

  render() {
    const { anySelectedRows, code } = this.props

    return (
      <Table.Footer>
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3' textAlign="center">
              <CountryTableButtonGroup anySelectedRows={anySelectedRows} 
                                      createNavigate={this.createNavigate}
                                      editNavigate={this.editNavigate} />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    )
  }
}

export default CountriesTableFooter