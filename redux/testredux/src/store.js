// ./src/store.js
import { createStore } from './componets/createStore'

export const ADD = 'ADD'
export const MINUS = 'MINUS'

function reducer(state = { count: 0 }, action) {
  console.log('action', action); // {type: 'xxx'}　　
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 }
    case MINUS:
      return { count: state.count - 1 }
    default:
      return state
  }
}

let store = createStore(reducer)
export default store
