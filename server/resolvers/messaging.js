const { getMessagesPerDay } = require('../models/messaging')

const Query = {
  messagesPerDay: () => {
    return getMessagesPerDay()
  }
}

const Mutation = {}


module.exports = {
  Query,
  Mutation,
}
