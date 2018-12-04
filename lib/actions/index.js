
export const toggleSideNav = () => ({
  type: 'TOGGLE_SIDE_NAV',
})

export const expandSideNavItem = (item) => ({
  type: 'EXPAND_SIDE_NAV_ITEM',
  payload: item,
})

export const selectSideNavItem = (item) => ({
  type: 'SELECT_SIDE_NAV_ITEM',
  payload: item,
})
