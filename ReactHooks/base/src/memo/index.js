import React, {Component, PureComponent, memo} from 'react'

class Foo extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 判断下次传递进来的值是否与当前值相等
    if (nextProps.name === this.props.name) {
      return false // 不重新渲染
    }
    return true // 重新渲染
  }

  render() {
    console.log('Foo render')
    return <div>age: {this.props.person.age}</div>
  }
}

// PureComponent 自动帮我们判断了 shouldComponentUpdate，但也有局限性
// 局限性就是只能判断属性是否变化，不能判断属性内部的值是否变化
class Foo2 extends PureComponent {
  render() {
    console.log('Foo2 render')
    return <div>age: {this.props.person.age}</div>
  }
}

// memo 避免组件重复渲染，和 PureComponent 类似
const Foo3 = memo(function Foo3(props) {
  console.log('Foo2 render')
  return <div>age: {props.person.age}</div>
})

class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1
    }
  }

  callback = () => {
  }

  render() {
    const {person} = this.state
    return (
      <div>
        <button onClick={() =>
          this.setState({count: this.state.count + 1})
        }>【{this.state.count}】 count +1
        </button>
        <button onClick={() => {
          person.age++
          this.setState({person})
        }}>【{this.state.person.age}】 person.age +1
        </button>
        <Foo person={person}/>
        {/* <Foo2 name="Mike" person={person} cb={this.callback}/> */}
        {/* <Foo3 name="Mike" person={person} cb={this.callback}/> */}
      </div>
    )
  }
}

export default App;