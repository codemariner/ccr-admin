import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'


let store

const initialState = {
  sideNav: {
    open: false,
    expandedItems: {},
  }
}

export function getStore(router) {
  if (!store) {
    const route = router.route
    const path = route.substring(1, route.lenth)
    if (path === "") {
      initialState.sideNav.selected = 'dashboard'
    } else {
      initialState.sideNav.selected = route.substring(1, route.lenth)
    }
    store = createStore(reducer, initialState, composeWithDevTools())
  }
  return store
}
