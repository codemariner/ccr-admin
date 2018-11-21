import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { compose } from 'redux'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Drawer       from '@material-ui/core/Drawer'
import Divider      from '@material-ui/core/IconButton'
import IconButton   from '@material-ui/core/IconButton'
import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import InboxIcon        from '@material-ui/icons/MoveToInbox'
import MailIcon         from '@material-ui/icons/Mail'


import { drawerWidth } from '../lib/constants'

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
})

const SideNav = ({ classes, theme, open }) => {
  console.log('render sidnav', open)
  const drawerClass = {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open,
  }
  return (
    <Drawer
      variant="permanent"
      open={open}
      className={classNames(classes.drawer, drawerClass)}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolBar}>
        <IconButton>
           {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

SideNav.propTypes = {
  open: PropTypes.bool,
}

const mapStateToProps = ({ sideNav: { open } }) => {
  console.log('state to props', open)
  return { open }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(SideNav)
