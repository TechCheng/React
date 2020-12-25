import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION
} from './actionType'
import axios from 'axios'

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

export const getTodoList = () => {
  return (dispatch) => {
    axios.get('/list').then((res) => {
      const data = res.data
      console.log('[data]', data)
      const action = initListAction(data)
      dispatch(action)
    })
  }
}


export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})


export const getBtnClickAction = () => ({
  type: ADD_TODO_ITEM
})


export const getItemDeleteAction = (value) => ({
  type: DELETE_TODO_ITEM,
  value
})
