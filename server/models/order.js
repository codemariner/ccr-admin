const db = require('../db')
const _ = require('lodash')

class Order {
  constructor(rowData) {
    console.log('rowData', rowData)
    _.map(rowData, (value, key) => {
      this[_.camelCase(key)] = value
    })
  }
  static build (rowData) {
    return new Order(rowData)
  }
}

async function getOrders() {
  const results = await db.query('SELECT * FROM orders')
  const orders = results.rows.map(Order.build)
  return orders
}

async function getOrdersPerDay(startDay) {
  const query = `
    SELECT DATE_TRUNC('day', created_at at time zone 'EDT') as date
       , status
       , count(status) as count
    FROM orders
   GROUP BY date, status
  ORDER BY date`

  const results = await db.query(query)
  const orders = results.rows.map(Order.build)
  return orders

}

module.exports = {
  getOrders,
  getOrdersPerDay,
}
