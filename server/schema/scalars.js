const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

exports.DateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue (value) {
    return new Date(value)
  },
  serialize (value) {
    if (typeof value === 'object') {
      return value.toISOString()
    }
    return value
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }
    return null
  },
})
