const _ = require('lodash')
const Bluebird = require('bluebird')

const config = require('../../config')
const db = require('../db')
const Row = require('./row')
const {
  pick,
  reduce,
  values
} = require('ramda')

const timezone = config.get('database:timezone')

class Order {
  constructor(rowData) {
    _.map(rowData, (value, key) => {
      this[_.camelCase(key)] = value
    })
  }
  static build (rowData) {
    return new Order(rowData)
  }
}

async function getOrders(opts={}) {
  const results = await db.query(`
    SELECT o.id
          ,o.number
          ,o.contact_id
          ,o.inmate_id
          ,o.recipient_inmate_id
          ,o.created_at
          ,o.status
          ,o.source
          ,o.total
          ,i.id as "inmate->id"
          ,i.username as "inmate->username"
          ,i.secondary_id as "inmate->secondaryId"
          ,i.first_name as "inmate->firstName"
          ,i.last_name as "inmate->lastName"
          ,i.facility_id as "inmate->facilityId"
     FROM orders as o
    INNER JOIN inmates as i
       ON o.recipient_inmate_id = i.id
  `)
  const orders = results.rows.map(Order.build)
  return orders
}

async function getOrdersPerDay(startDay) {
  const query = `
    select to_char(date_trunc('day', created_at at time zone '${timezone}'), 'YYYY-MM-DD 00:00:00') as day
       , status
       , count(status) as count
    from orders
   group by day, status
   order by day`

  const results = await db.query(query)
  return results.rows
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
    item.id = item.orderItemId
    order.items.push( item )
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
  const commissaryQuery = `
    select sum(total)
      from orders
     where source in ('MANUAL', 'MARKETPLACE')
       and status = 'COMPLETED'
  `
  const onlineQuery = `
    select sum(amount)
      from payments
     where type in ('STRIPE_INVOICE', 'STRIPE_CHARGE')
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
