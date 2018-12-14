import PropTypes from 'prop-types'
import React from 'react'
import Router from 'next/router'

import { connect } from 'react-redux'
import { compose } from 'redux'

import { withStyles } from '@material-ui/core/styles'
import Collapse       from '@material-ui/core/Collapse'
import List           from '@material-ui/core/List'
import ListItem       from '@material-ui/core/ListItem'
import ListItemIcon   from '@material-ui/core/ListItemIcon'
import ListItemText   from '@material-ui/core/ListItemText'

import ExpandLessIcon   from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon   from '@material-ui/icons/ExpandMore'

import { expandSideNavItem, selectSideNavItem } from '../../lib/actions'

const styles = (theme) => ({
})

const MenuItem = ({
  children,
  classes,
  expandClick,
  expandedItems,
  icon,
  itemKey,
  route,
  select,
  selected, 
  sideNavOpen,
  text, 
}) => {

  let expander = null
  let isSelected = selected === itemKey

  let onClick = select(itemKey, route)

  if (children) {
    expander = expandedItems[itemKey] ? <ExpandLessIcon/> : <ExpandMoreIcon/>
    if (!isSelected) {
      // see if one of it's children is selected
      isSelected = React.Children.toArray(children).find((child) => {
        return child.props.itemKey && child.props.itemKey === selected
      }) != null
    }
    onClick = expandClick(itemKey)
  }

  const expanded = sideNavOpen && expandedItems[itemKey]

  return (
    <div>
    <ListItem button key={itemKey} route={route} selected={isSelected} onClick={onClick}>
      <div style={{display: 'flex'}}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {text ? <ListItemText inset primary={text}/> : null}
        { expander }
      </div>
    </ListItem>
    <Collapse in={expanded}>
      {children}
    </Collapse>
    </div>
  )
}

MenuItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  route: PropTypes.string,
  text: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => ({
  expandClick: (itemKey) => {
    return () => {
      dispatch(expandSideNavItem(itemKey))
    }
  },
  select: (itemKey, route) => {
    return () => {
      dispatch(selectSideNavItem(itemKey))
      if (route) {
        console.log('pushing route', route)
        Router.push({ pathname: route })
      }
    }
  },
})

const mapStateToProps = ({ sideNav: { open, expandedItems, selected } }) => ({
  sideNavOpen: open,
  expandedItems,
  selected,
})

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(MenuItem)
