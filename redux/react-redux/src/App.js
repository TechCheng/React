import React from 'react'
import store from './Store'
import { Provider } from 'react-redux'
import TodoListUI from './componets/TodoListUI';
import {
  getTodoList
} from './Store/actionCreator';
class TodoList extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const action = getTodoList()
    store.dispatch(action)
  }

  render() {
    return (
      <Provider store={store}>
        <TodoListUI/>
      </Provider>
    )
  }

}

export default TodoList