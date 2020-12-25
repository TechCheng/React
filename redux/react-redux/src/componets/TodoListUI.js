import React from 'react'
import { Input, Button, List } from 'antd'
import { connect } from 'react-redux'
import {
  getInputChangeAction,
  getBtnClickAction,
  getItemDeleteAction
} from '../Store/actionCreator';

const TodoListUI = (props) => {
  const { inputValue, list, handleChange, handleBtnClick, handleItemDelete } = props
  return (
    <div style={{ marginTop: '10px', marginLeft: '10px' }}>
      <div>
        <Input
          value={inputValue}
          placeholder='todo info'
          onChange={handleChange}
          style={{ width: '300px', marginRight: '10px' }}></Input>
        <Button type="primary" onClick={handleBtnClick}>提交</Button>
      </div>
      <List
        style={{ marginTop: '10px', width: '300px' }}
        bordered
        dataSource={list}
        renderItem={(item, index) => (<List.Item
          onClick={handleItemDelete.bind(this, index)}
        >{item}</List.Item>)}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  inputValue: state.inputValue,
  list: state.list
})

const mapDispatchToProps = (dispatch) => ({
  handleChange(e) {
    const action = getInputChangeAction(e.target.value)
    dispatch(action)
  },

  handleBtnClick() {
    const action = getBtnClickAction()
    dispatch(action)
  },

  handleItemDelete(index) {
    const action = getItemDeleteAction(index)
    dispatch(action)
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoListUI)