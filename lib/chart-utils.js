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

export function toLineChartData(data, chartConfig = {}) {
  const captureStats = (result, stats) => {
    let x = prop(chartConfig.x, stats)
    if (!x) {
      return result
    }
    if (chartConfig.xTransform) {
      x = chartConfig.xTransform(x)
    }

    // all fields but x axis field and __typename
    const dataFields = filter(
      (key) => (
        !includes(key, [ chartConfig.x, '__typename' ]) &&
            includes(key, chartConfig.y)
      ),
      keys(stats)
    )

    dataFields.forEach((key) => {
      result[key] = result[key] || { id: key, data: [] }
      const { data } = result[key]
      data.push(
        { x,
          y: stats[key],
        }
      )
    })
                       
    return result
  }

  return values(reduce(captureStats, {}, data))
}

