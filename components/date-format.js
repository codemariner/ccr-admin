import { PropTypes } from 'prop-types'

import { pathOr } from 'ramda'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'


// type param to moment format
const typeToFormat = {
  LONG: 'L LT',
  DAY: 'L',
}

const format = (type) => (
  pathOr('LLL', [type], typeToFormat)
)

const DateFormat = ({ value, type='LONG' }) => {

  const date = moment(value).format(format(type))
  return (
    <Typography>{date}</Typography>
  )
}


export default DateFormat
