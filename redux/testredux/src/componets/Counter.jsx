// ./src/components/Counter.jsx
import React from 'react'
import { bindActionCreators } from 'redux'
import store from '../store'

function add() {
  return { type: 'ADD' }
}

function minus() {
  return { type: 'MINUS' }
}

// const bindAdd = bindActionCreators(add, store.dispatch)
// const bindMinus = bindActionCreators(minus, store.dispatch)
const actions = { add, minus }
const bindActions = bindActionCreators(actions, store.dispatch)

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: store.getState().count
    }
  }

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().count
      })
    })
  }

  componentWillUnmount() {
    this.unSubscribe && this.unSubscribe()
  }

  render() {
    return <div>
      <p>{this.state.number}</p>
      <button onClick={bindActions.add}>+</button>
      <button onClick={bindActions.minus}>-</button>
    </div>
  }
}

export default Counter
