## 第5章 [新特性]React新特性之Redux

### 5-1 React Redux的概念与意义

Redux [三大原则](https://cn.redux.js.org/docs/introduction/ThreePrinciples.html)：
1. 单一数据源。
2. State 是只读的。
3. 使用纯函数来进行修改。

### 5-2 没有Redux的世界

> 

纯 React 开发 TodoList

App.js
```js
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import './App.css'

let idSeq = Date.now()

const Control = memo(function Control(props) {
  const {addTodo} = props
  const inputRef = useRef()

  // onSubmit 没有向任何子组件传递，所以不需要用 useCallback 包裹
  const onSubmit = (e) => {
    e.preventDefault()

    const newText = inputRef.current.value.trim()

    if (newText.length === 0) return

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    inputRef.current.value = ''
  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="new-todo"
          placeholder="What neesd to be done?"/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const {
    todo: {
      id, text, complete
    }, removeTodo, toggleTodo
  } = props

  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }

  return (
    <li className='todo-item'>
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={
        complete ? 'complete' : ''
      }>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const {todos, removeTodo, toggleTodo} = props
  return (
    <ul className="todos">
      {
        todos.map(todo => {
          return (<TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />)
        })
      }
    </ul>
  )
})

const LS_KEY = '_$-todos_'

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id ?
        {
          ...todo,
          complete: !todo.complete
        } : todo
    }))
  }, [])

  // 载入数据
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
  }, [])

  // 写入数据
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])


  return (
    <div className="todo-list">
      <Control addTodo={addTodo}/>
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
    </div>
  )
}

export default TodoList
```

App.css
```css
.todo-list {
  width: 550px;
  margin: 10px auto;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 25px 0 rgba(0, 0, 0, 0.1);
}

.control h1 {
  width: 100%;
  text-transform: uppercase;
  font-size: 50px;
  text-align: center;
  margin: 0;
  color: rgba(175, 47, 47, 0.15);
}

.control .new-todo {
  padding: 16px 16px 16px 60px;
  border: 0;
  outline: none;
  font-size: 24px;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.3);
}

.todos {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-item {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.todo-item input {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 20px;
}

.todo-item label {
  flex: 1;
  padding: 15px 15px 15px 0;
  line-height: 1.2;
  display: block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.todo-item label.complete {
  text-decoration: line-through;
}

.todo-item button {
  border: 0;
  outline-color: #cc9a9a;
  display: block;
  width: 40px;
  font-size: 30px;
  background: #fff;
  color: #cc9a9a;
  cursor: pointer;
}
```

### 5-3 Dispatch与Action
### 5-4 使用Reducer拆解数据更新
### 5-5 异步Action
