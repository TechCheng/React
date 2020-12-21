import React from 'react'
import { Input, Button, List } from 'antd'
import { connect } from 'react-redux'

const TodoListUI = (props) => {
  return (
    <div style={{ marginTop: '10px', marginLeft: '10px' }}>
      <div>
        <Input
          value={props.state.inputValue}
          placeholder='todo info'
          onChange={props.handleChange}
          style={{ width: '300px', marginRight: '10px' }}></Input>
        <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
      </div>
      <List
        style={{ marginTop: '10px', width: '300px' }}
        bordered
        dataSource={props.state.list}
        renderItem={(item, index) => (<List.Item
          onClick={props.handleItemDelete.bind(this, index)}
        >{item}</List.Item>)}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    },
    handleClick() {
      const action = {
        type: 'add_todo_item'
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListUI)