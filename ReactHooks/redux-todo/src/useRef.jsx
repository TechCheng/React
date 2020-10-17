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
  speak() {
    console.log(`now counter is :${this.props.count}`)
  }

  render() {
    const { props } = this
    return (
      <h1 onClick={props.onClick} > {props.count}</h1>
    )
  }
}


function App(props) {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const counterRef = useRef();

  const double = useMemo(() => {
    return count * 2
  }, [count === 3]);

  const it = useRef()

  const click = useCallback(() => {
    console.log('click')
    setClickCount(clickCount + 1)

    console.log(counterRef.current.speak())
  }, [counterRef])

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

  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>
        按压Count:({count}),double：{double}
      </button>
      <Counter ref={counterRef} count={double} onClick={click} />
    </div>
  )
}

export default App