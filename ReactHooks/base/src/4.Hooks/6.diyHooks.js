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
    console.log('1212')
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  },[])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}

function App() {
  const [count, setCount] = useCount(0)   //返回处理逻辑
  const Count = useCounter(count)   //返回JSX
  const size = useSize()   //返回处理逻辑
 
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