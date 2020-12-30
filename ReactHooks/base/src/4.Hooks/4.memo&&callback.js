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