import {
  map,
  props,
} from 'ramda'

import React from 'react'
import { compose, graphql } from 'react-apollo'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography'

import {
  getOrders,
} from '../../lib/graphql/queries'

import DateFormat from '../date-format'


const columns = [
  {
    name: 'Number',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'Date',
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: 'Status',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Source',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Total',
    options: {
      filter: false,
      sort: true,
    },
  },
]

const options = {
  filterType: 'checkbox',
}


const OrdersTable = ({ data: { loading=true, error, orders=[], ...rest }}) => {
  const data = orders.map(props(['number', 'createdAt', 'status', 'source', 'total']))

  return (
    <MUIDataTable
      title={'Orders'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default compose(
  graphql(getOrders)
)(OrdersTable)
