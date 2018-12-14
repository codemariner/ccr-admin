const Twilio = require('twilio')

const config = require('../../config')

const { sid, token } = config.get('twilio')


const client = new Twilio(sid, token)

module.exports = client
