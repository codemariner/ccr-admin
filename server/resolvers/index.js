const fs = require('fs')
const { readdirSync } = require('fs')

const resolvers = readdirSync(__dirname)
  .filter(f => f.endsWith('.js') && f !== 'index.js')
  .reduce((memo, file) => {
    const resolver = require(`./${file}`)
    Object.assign(memo.Query, resolver.Query)
    Object.assign(memo.Mutation, resolver.Mutation)
    return memo
  }, {Query: {}, Mutation: {}})

module.exports = resolvers
