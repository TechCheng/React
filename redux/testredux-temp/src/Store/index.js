import { createStore } from 'redux' // 引入一个第三方的方法
import reducer from './reducer'

const store = createStore(reducer) // 创建数据的公共存储区域（管理员）

export default store