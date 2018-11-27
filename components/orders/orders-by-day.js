import moment from 'moment'

import {
  groupBy,
  map,
  prop,
  toPairs,
} from 'ramda'

import Highcharts from 'highcharts'
import {
  HighchartsChart,
  Chart,
  Loading,
  withHighcharts,
  XAxis, YAxis, Title, Subtitle, Legend, LineSeries,
} from 'react-jsx-highcharts';


const toPoints = (order) => ([new Date(order.day).getTime(), order.count])

const plotOptions = {
  line: {
    marker: {
      enabled: false,
    },
  },
}
const OrdersByDay = ({ loading, error, ordersPerDay=[], variables }) => {
  if (error) return 'Error: ' + error.message

  const startDate = moment(new Date()).subtract(1, 'year').toDate()
  
  const ordersByStatus = groupBy(prop('status'))(ordersPerDay)

  return (

  <div id='ordersPerDay'>
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Orders Per Day</Title>

      // <Subtitle></Subtitle>
      <Loading isLoading={loading}>Fetching data...</Loading>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis type="datetime">
        <XAxis.Title>Day</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Number of Orders</YAxis.Title>
        <LineSeries name="All Orders" data={map(toPoints, ordersPerDay)} />
        {map(
          ([status, orders]) => (
            <LineSeries name={status} data={map(toPoints, orders)} />
          ),
          toPairs(ordersByStatus)
        )}
      </YAxis>
    </HighchartsChart>
  </div>
  )
}

export default withHighcharts(OrdersByDay, Highcharts)
