const { path } = require('ramda')

const config = require('../../config')
const cache = require('../cache')
const db = require('../db')
const twilio = require('../services/twilio')
const Row = require('./row')


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

async function fetchInmates(phoneNumbers) {
  const phoneNumberSets = splitEvery(50)
}

const KEY1 = 'models/messaging/getPhoneNumbers'
const getPhoneNumbers = async () => {
  const results = cache.fetch(KEY1, 4 * 60 * 60, async () => {
    const list = await twilio.incomingPhoneNumbers.list()
    const numbers = list.map(path('phoneNumber'))

    const data = list.map((number) => {
      const { dateCreated, phoneNumber } = number
      const isDate = dateCreated instanceof Date
      return {
        phoneNumber,
        dateCreated: isDate ? dateCreated : new Date(dateCreated),
      }
    })
    return data
  })

  return results
}

module.exports = {
  getMessagesPerDay,
  getPhoneNumbers,
}
