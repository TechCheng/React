import React, {useState} from 'react';

function App() {
  const [count, setCount] = useState(() => {
    console.log('如果默认值是函数，那么只会执行一次，可用于传 props 和计算')
    return 2
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