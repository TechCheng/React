import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION
} from './actionType';

const defaultState = {
  inputValue: '123',
  list: [1, 2]
}
export default (state = defaultState, action) => {
  if (action.type == CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }

  if (action.type == ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = [...state.list, newState.inputValue]
    newState.inputValue = ''
    return newState
  }

  if (action.type == DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.value, 1)
    return newState
  }

  if (action.type == INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = [...state.list, ...action.data]
    return newState
  }

  return state
}