const db = require('../db')

const Row = require('./row')
const config = require('../../config')

const timezone = config.get('database:timezone')

async function getMessagesPerDay() {
  const query = `
select to_char(date_trunc('day', sent_at at time zone '${timezone}'), 'YYYY-MM-DD 00:00:00') as day
     , count(distinct(inmate_id)) as residents
     , count(distinct(contact_id)) as contacts
     , count(created_at) as messages
     , count(created_at) / count(distinct(inmate_id)) as "avgMsgResident"
     , count(created_at) / count(distinct(contact_id)) as "avgMsgContact"
  from messages
 group by day
`
  const results = await db.query(query)
  return results.rows.map(Row.build)
}

module.exports = {
  getMessagesPerDay,
}
