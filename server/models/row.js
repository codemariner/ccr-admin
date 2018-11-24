const { camelCase, map } = require('lodash')

class Row {
  constructor(rowData) {
    map(rowData, (value, key) => {
      this[camelCase(key)] = value
    })
  }
  static build (rowData) {
    return new Row(rowData)
  }
}

module.exports = Row
