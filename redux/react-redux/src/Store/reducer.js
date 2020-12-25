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
  //初始化
  if (action.type == INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = [...state.list, ...action.data]
    return newState
  }
 
  //输入
  if (action.type == CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  

  //增加
  if (action.type == ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = [...state.list, newState.inputValue]
    newState.inputValue = ''
    return newState
  }
  
  //删除
  if (action.type == DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.value, 1)
    return newState
  }


  return state
}