import React from 'react'
import { Input, Button, List } from 'antd'


const TodoListUI = (props) => {
  const { inputValue, handleChange, handleBtnClick, list, handleItemDelete } = this.props
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


export {
  TodoListUI
}