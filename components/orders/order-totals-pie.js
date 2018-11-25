import { ResponsivePie } from '@nivo/pie'

import { toPieChartData } from '../../lib/chart-utils'

const OrderTotalsPie = ({loading, error, orderTotals }) => {
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`
  if (!orderTotals) return 'no results'

  const chartData = orderTotals.totals.map((total) => (
    { id: total.type, label: total.type, value: total.total}
  ))

  return (
    <ResponsivePie
        data={chartData}
        colors='paired'
        theme={{
          labels: {
            fontSize: '15px',
          },
        }}
        />
  )
}

export default OrderTotalsPie
