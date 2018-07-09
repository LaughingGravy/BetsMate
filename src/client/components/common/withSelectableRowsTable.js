import React from 'react'

export function withSelectableRowsTable(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        activeRows: []
      }

      this.onRowClick = this.onRowClick.bind(this);
    }

    onRowClick(e, id) {
      e.preventDefault()

      const { activeRows } = this.state
      const { isMultiSelect } = this.props

      let nextRows = {}

      if (isMultiSelect == true)  {
        nextRows = {
          ...activeRows,
          [id]: !activeRows[id]
        }
      }
      else {
        nextRows = {
          [id]: !activeRows[id]
        }
      }

      this.setState({
        activeRows: nextRows
      })

    }
  
    render() {
      const { activeRows } = this.state

      return (
        <WrappedComponent {...this.props} activeRows={activeRows} onRowClick={this.onRowClick} />
      )
    }
  }
}