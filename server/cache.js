const Blubebird = require('bluebird')
const NodeCache = require('node-cache')

const config = require('../config')

const cache = new NodeCache(config.get('cache'))

cache.fetch = async function (key, ttl, callback) {
  const value = cache.get(key)
  if (value) {
    return value
  }
  const result = await callback()
  cache.set(key, result, ttl)
  return result
}
module.exports = cache
