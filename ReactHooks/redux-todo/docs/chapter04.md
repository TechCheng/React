
## 第4章 [新特性]React颠覆性新特性Hooks

### 4-1 React Hooks的概念与意义

（略）

### 4-2 使用State Hooks

> 5e8dc3e369350d429ad86af2d0813f334d8a79ce

```js
import React, {useState} from 'react';

function App() {
  const [count, setCount] = useState(() => {
    console.log('如果默认值是函数，那么只会执行一次，可用于传 props 和计算')
    return 1
  });


  console.log('render')
  return (
    <button
      onClick={() => {
        setCount(count + 1)
      }}
    >Click ({count})</button>
  )
}

export default App
```

### 4-3 使用Effect Hooks

> c231d5863f1f9ddff888e1e6be7760419b6a4b17

```js
import React, {useEffect, useState} from 'react';

class App0 extends React.Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  }

  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
    })
  }

  componentDidMount() {
    document.title = this.state.count

    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.count
  }

  render() {
    const {count, size} = this.state
    return (
      <button
        onClick={() => {
          this.setState({count: count + 1})
        }}
      >
        Click ({count}) size: {size.width + 'x' + size.height}
      </button>
    );
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  function onResize() {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  useEffect(() => {
    console.log('set title', count)
    document.title = count
  }, [count]);

  useEffect(() => {
    console.log('addEventListener')
    window.addEventListener('resize', onResize)
    return () => {
      console.log('removeEventListener')
      window.removeEventListener('resize', onResize)
    }
  }, [])

  function handleClick() {
    console.log('click')
  }

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', handleClick)
    return () => {
      document.querySelector('#size').removeEventListener('click', handleClick)
    }
  })

  return (
    <div>

      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Click ({count})
      </button>
      {
        count % 2
          ? <span id="size">size: {size.width + 'x' + size.height}</span>
          : <p id="size">size: {size.width + 'x' + size.height}</p>
      }

    </div>
  )
}

export default App
```

### 4-4 使用Context Hooks

> f8f85586d722407f83fa695f5f4f524476a07479

```js
import React, {createContext, useContext, useState} from 'react';

const CountContext = createContext();

class Foo extends React.Component {
  render() {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    );
  }
}

class Bar extends React.Component {
  static contextType = CountContext

  render() {
    const count = this.context
    return (
      <h1>{count}</h1>
    );
  }
}

function Counter() {
  const count = useContext(CountContext)

  return (
    <h1>{count}</h1>
  );

}


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Click ({count})
      </button>

      <CountContext.Provider value={count}>
        <Foo/>
        <Bar/>
        <Counter/>
      </CountContext.Provider>
    </div>
  )
}

export default App
```

### 4-5 使用Memo&Callback Hooks

> 4f88bec6a2618ce0af8a363ce4be824c55da9044

```js
import React, {memo, useMemo, useState, useCallback} from 'react';

const Counter = memo(function Counter(props) {
  console.log('Counter render')
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  );
})


function App() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const half = useMemo(() => {
    return double / 4
  }, [double])

  // 确保 onClick 只有一个句柄，防止每次重新生成函数导致 Counter 重新渲染
  const onClick = useMemo(() => {
    return () => {
      console.log('Click')
      setClickCount(clickCount => clickCount+1)
    }
  }, [])

  // 当useMemo返回一个函数时，useCallback与之等效
  // const onClick = useCallback(() => {
  //   console.log('Click')
  // }, []);
  
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Click ({count}), double: ({double}), half: ({half})
      </button>

      <Counter count={double} onClick={onClick}/>
      <div>Click count: {clickCount}</div>
    </div>
  )
}

export default App
```

### 4-6 使用Ref Hooks

> 9129c8bf804f3db38e98d979a00749e4782c4278

```js
import React, {PureComponent, useCallback, useEffect, useMemo, useRef, useState} from 'react';

class Counter extends PureComponent {
  speak() {
    console.log(`now counter is ${this.props.count}`)
  }

  render() {
    const {props} = this
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    )
  }
}


function App() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const counterRef = useRef()
  const it = useRef() // 使用 useRef 保存需要使用的“静态”数据，类似于 Class 组件中的类属性成员。

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick = useCallback(() => {
    console.log('Click')
    setClickCount(clickCount => clickCount + 1)

    // 使用 ref 来保存组件
    counterRef.current.speak()
  }, [counterRef]);

  // 仅再首次挂载后执行
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 500)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  }, [count])

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Click ({count}), double: ({double})
      </button>

      <Counter ref={counterRef} count={double} onClick={onClick}/>
      <div>Click count: {clickCount}</div>
    </div>
  )
}

export default App
```

### 4-7 自定义Hooks

> a1d0531c20c62909812acb345a5ffb981f891f08

```js
import React, {useEffect, useRef, useState, useCallback} from 'react';

function useCounter(count) {
  const size = useSize()
  return (
    <h1>{count} size: {size.width}x{size.height}</h1>
  )
}

// 自定义 Hook 函数，必须以 use 开头
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const it = useRef() // 使用 useRef 保存需要使用的“静态”数据，类似于 Class 组件中的类属性成员。

  // 仅再首次挂载后执行
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 500)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  }, [count])

  return [count, setCount]
}

// 自定义 Hook 函数
function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}

function App() {
  const [count, setCount] = useCount(0)
  const Count = useCounter(count)
  const size = useSize()

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Click ({count}) size: {size.width}x{size.height}
      </button>

      {Count}
    </div>
  )
}

export default App
```

### 4-8 Hooks的使用法则

[法则](https://zh-hans.reactjs.org/docs/hooks-rules.html)只有两条：

1. 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook。
2. 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。

### 4-9 Hooks的常见问题

- Q: 生命周期函数如何映射到 Hooks？
    A：使用 useEffect
    
- Q: 类实例成员变量如何映射到 Hooks？
    A：使用 useRef
    
- Q: Hooks 中如何获取历史 props 和 state？
    A：使用 useRef 和 useEffect 巧妙地保存和读取上一次的 state 值
    
    ```js
    function Counter() {
        const [count, setCount] = useState(0)
        const prevCountRef = useRef()
        useEffect(()=>{
            prevCountRef.current = count
        })
        const prevCount = prevCountRef.current
        
        return <h1>Now: {count}, prev: {prevCount}</h1>
    }
    ```
    
- Q：如何强制更新一个 Hooks 组件？

    A：创建一个不参与渲染的 state，更新它的值的时候就会触发重渲染

    ```js
    function Counter() {
        const [updater, setUpdater] = useState(0)
        function forceUpdate() {
            setUpdater(updater => updater+1)
        }
        
        return <h1>Test</h1>
    }
    ```

    
