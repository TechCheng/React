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