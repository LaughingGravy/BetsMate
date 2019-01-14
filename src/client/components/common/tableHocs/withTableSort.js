import React from 'react'

export function withTableSort(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        column: null,
        data: props.data,
        direction: null,
      }
    }

    sortByObjectProperty = (data, colName, direction) => {
      const colNameArray = colName.split(".");
      const objectPropertyName = colNameArray[0]
      const propertyName = colNameArray[1]

      let sortData = data[Object.keys(data)[0]]

      const isNumber = !isNaN(parseFloat(sortData[0][objectPropertyName][propertyName])) && isFinite(sortData[0][objectPropertyName][propertyName])

      sortData.sort((current, next) => {
        let result = null

        if (isNumber) { 
          result = current[objectPropertyName][propertyName] - next[objectPropertyName][propertyName];
        } else {
          result = current[objectPropertyName][propertyName].toUpperCase()
                          .localeCompare(next[objectPropertyName][propertyName].toUpperCase()); // string
        }

        return direction === 'ascending' ? result : result * (-1);
      });

      data[Object.keys(data)[0]] = sortData;

      return data;
    }

    sortByProperty = (data, colName, direction) => {
      let sortData = data[Object.keys(data)[0]]

      const isNumber = !isNaN(parseFloat(sortData[0][colName])) && isFinite(sortData[0][colName])

      sortData.sort((current, next) => {
        let result = null

        if (isNumber) { 
          result = current[colName] - next[colName];
        } else {
          result = current[colName].toUpperCase().localeCompare(next[colName].toUpperCase()); // string
        }

        return direction === 'ascending' ? result : result * (-1);
      });

      data[Object.keys(data)[0]] = sortData;

      return data;
    }

    handleSort = (clickedColumn) => () => {
      const { column, data, direction } = this.state

      const isObjectProperty = clickedColumn.includes(".") //eg country.name
  
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          direction: 'ascending',
          data: isObjectProperty ? this.sortByObjectProperty(data, clickedColumn, 'ascending') 
                                      : this.sortByProperty(data, clickedColumn, 'ascending')
        })
  
        return
      }

      const nextDirection = direction === 'ascending' ? 'descending' : 'ascending'
  
      this.setState({
        data: isObjectProperty ? this.sortByObjectProperty(data, clickedColumn, nextDirection)  
                                    : this.sortByProperty(data, clickedColumn, nextDirection),
        direction: nextDirection
      })
    }
  
    render() {
      const { column, direction } = this.state

      return (
        <WrappedComponent {...this.props} sortColumn={column} sortDirection={direction} onHeaderClick={this.handleSort} />
      )
    }
  }
}