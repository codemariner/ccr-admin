import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/IconButton'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


const styles = (theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
})

const SideNav = ({ classes, theme, open }) => (
  <Drawer variant="permanent">
    <div className={classes.toolBar}>
      <IconButton>
         {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </div>
    <Divider />
  </Drawer>
)

SideNav.propTypes = {
  open: PropTypes.bool,
}

export default withStyles(styles, { withTheme: true })(SideNav)
