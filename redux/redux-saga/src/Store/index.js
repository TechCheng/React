import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import todoSagas from './saga'

const sagaMiddleware = createSagaMiddleware() // 创建saga中间件

// 创建数据的公共存储区域
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
) 

sagaMiddleware.run(todoSagas)

export default store