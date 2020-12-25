import { createStore, applyMiddleware } from 'redux' // 引入一个第三方的方法
import reducer from './reducer'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
  )

export default store