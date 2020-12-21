import React from 'react'
import store from './Store'
import axios from 'axios'
import { Provider } from 'react-redux'
import {
  initListAction,
  getInputChangeAction,
  getBtnClickAction,
  getItemDeleteAction
} from './Store/actionCreator';
import TodoListUI from './componets/TodoListUI';

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
    axios.get('/list').then((res) => {
      const data = res.data
      console.log('[data]', data)
      const action = initListAction(data)
      store.dispatch(action)
    })
  }

  render() {
    return (
      <Provider store={store}>
        <TodoListUI
          state={this.state}
          handleChange={this.handleChange}
          handleBtnClick={this.handleBtnClick}
          handleItemDelete={this.handleItemDelete}
        />
      </Provider>
    )
  }

}

export default TodoList