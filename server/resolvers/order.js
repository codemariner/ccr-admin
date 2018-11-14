const {
  getOrders,
  getOrdersPerDay
} = require('../models/order')

const Query = {
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
