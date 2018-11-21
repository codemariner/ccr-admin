// state = {
//   sideNav: {
//   },
// }
const initialState = {
  open: false,
}

const handlers = {
  TOGGLE_SIDE_NAV: (state, action) => {
    return {
      ...state,
      open: !state.open,
    }
  },
}
const noOpHandler = (state, action) => {
  console.warn('received unhandled action', action)
  return state
}

const reducer = (state = initialState, action) => {
  const handler = handlers[action.type] || noOpHandler
  const newState = handler(state, action)
  return newState
}

export default reducer
