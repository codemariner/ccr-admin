const {
  getOrders,
  getOrdersPerDay,
  getOrderTotals,
  getPendingOrders,
} = require('../models/order')

const Query = {
  pendingOrders: () => {
    return getPendingOrders()
  },
  orders: () => {
    return getOrders()
  },
  ordersPerDay: () => {
    return getOrdersPerDay()
  },
  orderTotals: () => {
    return getOrderTotals()
  }
}

const Mutation = {}


module.exports = {
  Query,
  Mutation,
}
