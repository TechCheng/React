import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from "./store/actions"

let idSeq = Date.now()

function bindActionCreators(actionCreators, dispatch) {
  const ret = {}

  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret
}


const Control = memo(function Control(props) {
  const { addTodo } = props
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
          placeholder="What neesd to be done?" />
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
  const { todos, removeTodo, toggleTodo } = props
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
  const [incrementCount, setIncrementCount] = useState(0);

  function reducer(state, action) {
    const { type, payload } = action
    const { todos, incrementCount } = state

    switch (type) {
      case 'set':
        return {
          ...state,
          incrementCount: incrementCount + 1,
          todos: payload
        }
    }
  }

  function reducer(state, action) {
    const { type, payload } = action
    const { todos, incrementCount } = state
    switch (type) {
      case 'set':
        return {
          ...state,
          todos: payload,
          incrementCount: incrementCount + 1
        }
      case 'add':
        return {
          ...state,
          todos: [...todos, payload],
          incrementCount: incrementCount + 1
        }
      case 'remove':
        return {
          ...state,
          todos: todos.filter(todo => todo.id !== payload)
        }
      case 'toggle':
        return {
          ...state,
          todos: todos.map(todo => {
            return todo.id === payload ?
              {
                ...todo,
                complete: !todo.complete
              } : todo
          })
        }
    }

    return state
  }

  const dispatch = useCallback((action) => {
    const state = {
      todos,
      incrementCount
    }
    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    const newState = reducer(state,action)
    
    for(let key in newState){
      setters[key](newState[key])
    }

  }, [todos, incrementCount])

  // 载入数据
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    dispatch(createSet(todos))
  }, [])

  // 写入数据
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])


  return (
    <div className="todo-list">
      <Control
        {
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
        }
      />
      <Todos
        todos={todos}
        {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
        }
      />
    </div>
  )
}

export default TodoList