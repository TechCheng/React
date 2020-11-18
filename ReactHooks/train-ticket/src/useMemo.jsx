import React,
{
  Component,
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  memo
} from 'react';


const Counter = memo(function Counter(props) {
  console.log('Counter Render')
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  )
})

function App(props) {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3]);

  // const click = useMemo(()=>{
  //   return() => {
  //     console.log('click')
  //   }
  // },[])

  // useMemo(()=> fn)
  // useCallback(fn)
  
  const click = useCallback(() => {
    console.log('click')
    setClickCount(clickCount + 1)
  }, [])


  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>
        按压Count:({count}),double：{double}
      </button>
      <Counter count={double} onClick={click} />
    </div>
  )
}

export default App