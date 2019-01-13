import React from 'react'

export function withTableSort(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        column: null,
        data: props.data,
        isAsc: true,
      }
    }

    sort = (data, colName, isAsc) => {
      let sortData = data[Object.keys(data)[0]]

      sortData.sort((current, next) => {
        const result = current[colName].toUpperCase().localeCompare(next[colName].toUpperCase()); 

        return isAsc ? result : result * (-1);
      });

      data[Object.keys(data)[0]] = sortData;

      return data;
    }

    handleSort = (clickedColumn) => () => {
      const { column, data, isAsc } = this.state

      console.log("clickedColumn", clickedColumn)
  
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: this.sort(data, clickedColumn, isAsc),
          isAsc: true,
        })
  
        return
      }
  
      this.setState({
        data: this.sort(data, clickedColumn, !isAsc),
        isAsc: !isAsc,
      })
    }
  
    render() {

      return (
        <WrappedComponent {...this.props} onHeaderClick={this.handleSort} />
      )
    }
  }
}