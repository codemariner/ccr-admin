import React from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import { getPendingOrders, getOrderTotals } from '../lib/graphql/queries'
import OrderTotalsPie from '../components/orders/order-totals-pie'
import PendingOrders from '../components/orders/pending-orders'

const styles = theme => ({
  tile: {
    padding: '5px 10px 10px 10px',
    height: '100%',
  },
  orderTotals: {
  },
})

const Dashboard = ({ classes, orderTotals, pendingOrders }) => {
  return (
    <Grid container spacing={24}>
      <Grid item
          xs={12} sm={6}
          >
        <Paper className={classes.tile}>
          <OrderTotalsPie className={classes.orderTotals} {...orderTotals}/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.tile}>
          <h2>Pending Orders</h2>
          <PendingOrders {...pendingOrders}/>
        </Paper>
      </Grid>
    </Grid>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  graphql(getPendingOrders, {
    options: (props) => ({
      fetchPolicy: 'cache-and-network',
    }),
    name: 'pendingOrders',
  }),
  graphql(getOrderTotals, {
    options: (props) => ({
      fetchPolicy: 'cache-and-network',
    }),
    name: 'orderTotals',
  }),
  withStyles(styles, { withTheme: true })
)
(Dashboard)
