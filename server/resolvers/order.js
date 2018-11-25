const {
  getOrders,
  getOrdersPerDay,
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
  }
}

const Mutation = {}


module.exports = {
  Query,
  Mutation,
}
