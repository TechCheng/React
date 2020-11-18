import React, { Component, useState, useEffect } from 'react';


class App2 extends Component {
  state = {
    count: 1
  }

  render() {
    let { count } = this.state
    return (
      <button onClick={() => {
        this.setState({
          count: count + 1
        })
      }}>
        按压Count:{count}
      </button>
    );
  }
}

function App(props) {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => (setSize({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }))

  const onClick = () => {
    console.log('click')
  }

  useEffect(() => {
    console.log('count:', count)
  }, [])

  useEffect(() => {
    document.title = count
  })

  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])


  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false)

    return () => {
      document.querySelector('#size').removeEventListener('click', onClick, false)
    }
  })

  return (
    <div>
      <button onClick={() => {
        setCount(size.width)
      }}>
        按压Count:({count})
    </button>
      {
        count % 2 ?
          <span id="size">我是span元素的size:{size.with}*{size.height}</span>
          : <p id="size">我是P元素的size:{size.with}*{size.height}</p>
      }
    </div>
  )
}

export default App