const db = require('../db')
const moment = require('moment')
const cache = require('../cache')


async function getSubcriptionsPerDay() {
  let day = moment('2018-08-29 00:00:00')

  const stats = []
  while (day.toDate().getTime() < new Date().getTime()) {
    day = day.add(1, 'day')
    const query = `
      select count(*)
        from subscriptions
        where start_at < $1
          and (cancel_at > $2 or cancel_at is null)
    `

    const values = [day.startOf('day').toDate(), day.startOf('day').toDate()]

    const result = await db.query(query, values)
    const row = {
      day: day.toDate(),
      count: result.rows[0].count
    }
    stats.push(row)
  }
  return stats
}

module.exports = {
  getSubcriptionsPerDay: async () => {
    return cache.fetch('models/subscription/getSubcriptionsPerDay', 4 * 60 * 60, getSubcriptionsPerDay)
  },
}
