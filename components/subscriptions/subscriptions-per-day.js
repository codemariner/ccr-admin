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
  Loading,
  withHighcharts,
  XAxis, YAxis, Title, Subtitle, Legend, LineSeries,
} from 'react-jsx-highcharts';


const toPoints = (value) => ([new Date(value.day).getTime(), value.count])

const plotOptions = {
  line: {
    marker: {
      enabled: false,
    },
  },
}
const SubscriptionsPerDay = ({ loading, error, subscriptionsPerDay=[], variables }) => {
  if (error) return 'Error: ' + error.message

  return (

  <div id='subscriptionsPerDay'>
    <HighchartsChart plotOptions={plotOptions}>
      <Title>Active Subscriptions Per Day</Title>

      // <Subtitle></Subtitle>
      <Loading isLoading={loading}>Fetching data...</Loading>

      <Legend enabled="false" layout="vertical" align="right" verticalAlign="middle" />

      <XAxis type="datetime">
        <XAxis.Title>Day</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Number of Subscriptions</YAxis.Title>
        <LineSeries name="Subscriptions" data={map(toPoints, subscriptionsPerDay)} />
      </YAxis>
    </HighchartsChart>
  </div>
  )
}

export default withHighcharts(SubscriptionsPerDay, Highcharts)
