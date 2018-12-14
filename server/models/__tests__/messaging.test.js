import Messaging from '../messaging'

describe('messaging', () => {
  it('getMessagesPerDay', async () => {
    const results = await Messaging.getMessagesPerDay()
    expect(results.length).toBeGreaterThan(1)
  })
  it('getPhoneNumbers', async () => {
    const results = await Messaging.getPhoneNumbers()
    console.log('got results', results)
  })
})
