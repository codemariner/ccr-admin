import PropTypes from 'prop-types'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import './main-layout.css'
import SideNav from './side-nav'

import { drawerWidth } from '../lib/constants'
import { toggleSideNav } from '../lib/actions'

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
})

const MainLayout = ({ classes, children, toggleSideNav, sideNavOpen }) => (
  <div className={classes.root}>
    <AppBar
      position='fixed'
      className={classNames(classes.appBar, {
        [classes.appBarShift]: sideNavOpen,
      })}
    >
      <Toolbar>
        <IconButton onClick={ toggleSideNav }>
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

const mapDispatchToProps = {
  toggleSideNav,
}
const mapStateToProps = ({ sideNav: { open }}) => ({
  sideNavOpen: open,
})

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(MainLayout)

