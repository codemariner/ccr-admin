const { Pool } = require('pg')
const config = require('../config')


const pool = new Pool({
  connectionString: config.get('database:uri'),
})

module.exports = pool
