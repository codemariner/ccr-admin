import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { compose } from 'redux'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Link from 'next/link'

import Button       from '@material-ui/core/Button'
import Collapse     from '@material-ui/core/Collapse'
import Drawer       from '@material-ui/core/Drawer'
import Divider      from '@material-ui/core/IconButton'
import IconButton   from '@material-ui/core/IconButton'
import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DashboardIcon    from '@material-ui/icons/Dashboard'
import ExpandLessIcon   from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon   from '@material-ui/icons/ExpandMore'
import GroupIcon        from '@material-ui/icons/Group'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ListAltIcon      from '@material-ui/icons/ListAlt'
import SmsIcon          from '@material-ui/icons/Sms'


import MenuItem from './menu-item'
import { drawerWidth } from '../../lib/constants'
import { expandSideNavItem, selectSideNavItem } from '../../lib/actions'

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
  const drawerClass = {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open,
  }

  const isSelected = (item) => ( item === selected )

  const selectable = (item) => ({
    key: item,
    onClick: () => {
      select(item)
    },
    selected: selected === item,
  })


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
        <MenuItem route="/" text="Dashboard" icon={<DashboardIcon/>} itemKey="dashboard"/>
        <MenuItem text="Ecommerce" icon={<ShoppingCartIcon/>} itemKey="ecommerce">
          <MenuItem route="/ecommerce/orders" text="Orders" itemKey="ecommerce/orders"/>
          <MenuItem route="/ecommerce/products" text="Products" itemKey="ecommerce/products"/>
        </MenuItem>
        <MenuItem route="/users" text="Users" icon={<GroupIcon/>} itemKey="users"/>
        <MenuItem route="/messaging" text="Messaging" icon={<SmsIcon/>} itemKey="messaging"/>
        <MenuItem text="Reporting" icon={<ListAltIcon/>} itemKey="reporting">
          <MenuItem text="Revenue" itemKey="reporting/revenue">
            <MenuItem route="/reporting/revenue/product-sales" text="Product Sales" itemKey="reporting/revenue/product-sales"/>
          </MenuItem>
        </MenuItem>
      </List>
      <Divider />
    </Drawer>
  )
}

SideNav.propTypes = {
  open: PropTypes.bool,
}

const mapStateToProps = ({ sideNav: { open, expandedItems, selected } }) => {
  return {
    open,
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(SideNav)
