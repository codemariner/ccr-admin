const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')


const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8')

let resolvers = require('../resolvers')

const { DateScalar } = require('./scalars')
resolvers = Object.assign(resolvers, {
  Date: DateScalar,
})


module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
