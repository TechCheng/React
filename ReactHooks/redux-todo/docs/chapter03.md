## 第3章 [新特性]React新特性一览

### 3-1 Context实现跨层级的组件数据传递

> 3d75e684f1d386171116c5017c064dad8bb5d6af

```js
import React, {createContext} from 'react';

const BatteryContext = createContext(90)
const OnlineContext = createContext()

function Leaf() {
  return (
    <BatteryContext.Consumer>
      {
        battery => (
          <OnlineContext.Consumer>
            {
              online => <h1>Battery: {battery}, Online: {String(online)}</h1>
            }
          </OnlineContext.Consumer>
        )
      }
    </BatteryContext.Consumer>
  )
}

function Middle() {
  return (
    <Leaf/>
  )
}

class App extends React.Component {
  state = {
    battery: 60,
    online: false
  }

  render() {
    const {battery, online} = this.state

    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button onClick={() => {
            this.setState({battery: battery - 1})
          }}>Press
          </button>
          <button onClick={() => {
            this.setState({online: !online})
          }}>Switch
          </button>
          <Middle/>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }


}

export default App;
```

### 3-2 静态属性ContextType访问跨层级组件的数据

> b436361efe7508cabbee110913e555485c1ccfa1

```js
import React, {createContext} from 'react';

const BatteryContext = createContext(90)

class Leaf extends React.Component {
  static contextType = BatteryContext

  render() {
    const battery = this.context

    return (
      <h1>Battery: {battery}</h1>
    )
  }
}

function Middle() {
  return (
    <Leaf/>
  )
}

class App extends React.Component {
  state = {
    battery: 60,
    online: false
  }

  render() {
    const {battery, online} = this.state

    return (
      <BatteryContext.Provider value={battery}>
        <button onClick={() => {
          this.setState({battery: battery - 1})
        }}>Press
        </button>
        <button onClick={() => {
          this.setState({online: !online})
        }}>Switch
        </button>
        <Middle/>
      </BatteryContext.Provider>
    )
  }


}

export default App;
```

### 3-3 Lazy与Suspense实现延迟加载

> fc11c8d7fd5c5324ede3bb312ce126f6db21a5fe

About.js
```js
import React from "react"

export default class About extends React.Component {
  render() {
    return <h1>About</h1>
  }
}
```

App.js
```js
import React, {lazy, Suspense} from 'react';

// 组件的懒加载（异步导入），使用 webpackChunkName 自定义文件名
const About = lazy(() => import(/* webpackChunkName: "about"*/'./About'))

// ErrorBoundary

class App extends React.Component {
  state = {
    hasError: false
  }

  // 由于网络或其他什么问题导致加载失败时的处理
  static getDerivedStateFromError() {
    return {hasError: true}
  }

  // componentDidCatch(error, errorInfo) {
  //   this.setState({
  //     hasError: true
  //   })
  // }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>
    }
    return (
      <div>
        {/*Suspense决定了当组件未载入时显示什么*/}
        <Suspense fallback={
          <div>Loading...</div>
        }>
          <About/>
        </Suspense>
      </div>
    )


  }
}

export default App;
```

### 3-4 Memo实现指定组件进行渲染

> 773412fe4f4548622c55f25baddc3e471ccb9a0c

```js
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
        {/*<Foo name="Mike"/>*/}
        {/*<Foo2 name="Mike" person={person} cb={this.callback}/>*/}
        <Foo3 name="Mike" person={person} cb={this.callback}/>
      </div>
    )
  }
}

export default App;
```
