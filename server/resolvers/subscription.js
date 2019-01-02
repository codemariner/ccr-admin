const {
  getSubcriptionsPerDay,
} = require('../models/subscription')

const Query = {
  subscriptionsPerDay: () => {
    return getSubcriptionsPerDay()
  },
}

const Mutation = {}


module.exports = {
  Query,
  Mutation,
}
