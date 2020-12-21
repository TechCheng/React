import React from 'react'
import { Input, Button, List } from 'antd'


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


export {
  TodoListUI
}