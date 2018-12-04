const handlers = {
  TOGGLE_SIDE_NAV: (state, action) => {
    return {
      ...state,
      open: !state.open,
    }
  },
  EXPAND_SIDE_NAV_ITEM: (state, action) => {
    const expandedItems = Object.assign({}, state.expandedItems)
    expandedItems[action.payload] = !expandedItems[action.payload]
    if (!state.open) {
      // only expand or collapse if the side nav is actually open
      return state
    }
    return {
      ...state,
      expandedItems,
    }
  },
  SELECT_SIDE_NAV_ITEM: (state, action) => {
    return {
      ...state,
      selected: action.payload,
    }
  },
}
const noOpHandler = (state, action) => {
  return state
}

const reducer = (state = {}, action) => {
  const handler = handlers[action.type] || noOpHandler
  const newState = handler(state, action)
  return newState
}

export default reducer
