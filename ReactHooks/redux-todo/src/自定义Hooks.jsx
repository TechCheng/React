import React,
{
  Component,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useRef,
  memo
} from 'react';


class Counter extends Component {
  render() {
    const { props } = this
    return (
      <h1> {props.count}</h1>
    )
  }
}

function useCounter(count){
  return (
    <h1> {count}</h1>
  )
}

function useCount(defaultCount) {  //自定义Hooks函数必须以use开头
  const [count, setCount] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count > 10) {
      clearInterval(it.current)
    }
  })

  return [count, setCount]
}


function App(props) {
  const [count, setCount] = useCount(0)
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>
        按压Count:({count})
      </button>
      <Counter count={count} />
      {useCounter(count)}
    </div>
  )
}

export default App