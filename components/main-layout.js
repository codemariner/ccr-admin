import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import './main-layout.css'
import SideNav from './sidenav'

const styles = (theme) => ({
  root: {
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
})

const MainLayout = ({ classes, children }) => (
  <div>
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <SideNav/>
    <main className={classes.content}>
    { children }
    </main>
  </div>
)

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}


export default withStyles(styles, { withTheme: true })(MainLayout)
