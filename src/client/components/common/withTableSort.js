import React from 'react'

export function withSelectableRowsTable(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        column: null,
        data: props.data,
        direction: null,
      }
    }

    sort = (data, colName, isAsc) => {
      return data.sort((a, b) => {
        if (isAsc) {
          return a[colName] < b[colName]
        }
        else {
          return a[colName] < b[colName]
        }
      })
    }

    handleSort = clickedColumn => () => {
      const { column, data, isAsc } = this.state
  
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: data.sort(data, clickedColumn, isAsc),
          isAsc: true,
        })
  
        return
      }
  
      this.setState({
        data: data.sort(data, clickedColumn, !isAsc),
        isAsc: !isAsc,
      })
    }
  
    render() {
      const { activeRows } = this.state

      return (
        <WrappedComponent {...this.props} onHeaderClick={this.handleSort} />
      )
    }
  }
}