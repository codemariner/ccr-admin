import { ResponsiveLine } from '@nivo/line'
import { toLineChartData } from '../../lib/chart-utils'

import {
  filter,
  includes,
  keys,
  not,
  partial,
  prop,
  reduce,
  values
} from 'ramda'


const chartConfig = {
  x: 'day',
  xTransform: (day) => {
    return new Date(day).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'})
  },
  y: [ 'residents', 'contacts', 'avgMsgResident', 'avgMsgContact' ],
}

const MessageUsagePerDay = ({ data: { loading, error, messagesPerDay } }) => {
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`
  if (!messagesPerDay) return 'no results'

  const chartData = toLineChartData(messagesPerDay, chartConfig)
  return (
    <div style={{height: '500px'}}>
      <ResponsiveLine
          data={ chartData }
          animate={true}
          margin={{
              "top": 50,
              "right": 110,
              "bottom": 50,
              "left": 60
          }}
          axisBottom={{
              "orient": "bottom",
              "tickSize": 8,
              "tickPadding": 5,
              "tickRotation": 75,
          }}
          >
      </ResponsiveLine>
    </div>
  )
}

export default MessageUsagePerDay
