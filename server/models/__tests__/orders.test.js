import Order from '../Order'

describe('order', () => {
  it('getPendingOrders', async () => {
    const results = await Order.getPendingOrders()
    expect(results).toBeTruthy()
  })

  it('getOrderTotals', async () => {
    const results = await Order.getOrderTotals()
    expect(results).toBeTruthy()
  })
})
