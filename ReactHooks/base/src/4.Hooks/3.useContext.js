import React, {createContext, useContext, useState} from 'react';

const CountContext = createContext();

//方法1
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


//方法2:必须是class组件
class Bar extends React.Component {
  static contextType = CountContext

  render() {
    const count = this.context
    return (
      <h1>{count}</h1>
    );
  }
}


//方法3
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