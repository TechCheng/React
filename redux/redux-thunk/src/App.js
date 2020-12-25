import React from 'react'
import { Input, Button, List } from 'antd'
import store from './Store'
import {
  getInputChangeAction,
  getBtnClickAction,
  getItemDeleteAction,
  getTodoList
} from './Store/actionCreator';
import { TodoListUI } from './componets/TodoListUI';

class TodoList extends React.Component {

  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
  }

  handleChange = (e) => {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleStoreChange = () => {
    this.setState(
      store.getState()
    )
  }

  handleBtnClick = () => {
    const action = getBtnClickAction()
    store.dispatch(action)
  }

  handleItemDelete = (index) => {
    const action = getItemDeleteAction(index)
    store.dispatch(action)
  }

  componentDidMount() {
    const action = getTodoList()
    store.dispatch(action)
  }

  render() {
    return (
      <TodoListUI
        state={this.state}
        handleChange={this.handleChange}
        handleBtnClick={this.handleBtnClick}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }

}

export default TodoList