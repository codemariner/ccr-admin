import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import MessagesPerDay from '../components/messaging/messages-per-day'

const styles = theme => ({
})

class Messaging extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <MessagesPerDay />
    )
  }
}

Messaging.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Messaging)
