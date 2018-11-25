const _ = require('lodash')
const Bluebird = require('bluebird')

const db = require('../db')
const Row = require('./row')
const {
  pick,
  reduce,
  values
} = require('ramda')

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

const pendingOrderProps = pick(['id', 'contactId', 'number', 'inmateId', 'recipientInmateId', 'createdAt', 'status', 'total'])
const pendingItemProps = pick(['orderItemId', 'productName', 'variantName', 'price'])

async function getPendingOrders() {
  const ordersQuery = `
      select o.id
         , o.number
         , o.contact_id as "contactId"
         , o.inmate_id as "inmateId"
         , o.recipient_inmate_id as "recipientInmateId"
         , o.created_at as "createdAt"
         , o.status
         , i.id as "orderItemId"
         , p.name as "productName"
         , v.name as "variantName"
         , i.price
         , 0 as "total" -- eventualy will come from database
     from orders as o
     inner join order_items as i
        on o.id = i.order_id
     inner join inmates as n
        on o.inmate_id = n.id
     inner join variants as v
        on i.variant_id = v.id
     inner join products as p
        on v.product_id = p.id
     where o.status in ('CREATED', 'SUBMITTED')
  `

  const feesQuery = `
    select f.id
         , o.id as "orderId"
         , type
         , amount
      from fees as f
     inner join orders as o
        on f.order_id = o.id
     where o.status in ('CREATED', 'SUBMITTED')
  `

  const [ orderResults, feeResults ] = await Promise.all([
    db.query(ordersQuery),
    db.query(feesQuery),
  ])


  const orders = orderResults.rows.reduce((accum, row) => {
    accum[row.id] = accum[row.id] || pendingOrderProps(row)
    const order = accum[row.id]
    order.items = order.items || []
    const item = pendingItemProps(row)
    order.total += item.price
    order.items.push( pendingItemProps(row) )
    order.fees = []
    return accum
  }, {})

  feeResults.rows.forEach((row) => {
    const order = orders[row.orderId]
    if (!order) {
      return
    }
    order.fees.push(pick(['type', 'amount'], row))
    order.total += row.amount
  })

  return values(orders)
}

async function getOrderTotals() {
  const onlineQuery = `
    select sum((cart ->> 'grandTotal')::float)  as "sum"
      from orders
      where cart is not null and status = 'COMPLETED'
  `
    
  const commissaryQuery = `
    select sum(sum) from
    (
      select sum(i.price) as "sum"
        from orders as o
       inner join order_items as i
          on o.id = i.order_id
        where o.status = 'COMPLETED'
      union
       select sum(f.amount) as "sum"
        from orders as o
       inner join fees as f
          on o.id = f.order_id
        where o.status = 'COMPLETED'
    ) as s;
  `

  const [ onlineResult, commissaryResult ] = await Promise.all([
    db.query(onlineQuery),
    db.query(commissaryQuery),
  ])
  const onlineTotal = onlineResult.rows[0].sum
  const commissaryTotal = commissaryResult.rows[0].sum

  return {
    totalGross: onlineTotal + commissaryTotal,
    totals: [
      { type: 'Website', total: onlineTotal },
      { type: 'Commissary', total: commissaryTotal },
    ]
  }
}

module.exports = {
  getOrders,
  getOrdersPerDay,
  getOrderTotals,
  getPendingOrders,
}
