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
  },[])

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