import React, {createContext} from 'react';

const BatteryContext = createContext(90)
const OnlineContext = createContext()

function Leaf() {
  return (
    <BatteryContext.Consumer>
      {
        battery => (
          <OnlineContext.Consumer>
            {
              online => <h1>Battery: {battery}, Online: {String(online)}</h1>
            }
          </OnlineContext.Consumer>
        )
      }
    </BatteryContext.Consumer>
  )
}

function Middle() {
  return (
    <Leaf/>
  )
}

class App extends React.Component {
  state = {
    battery: 60,
    online: false
  }

  render() {
    const {battery, online} = this.state

    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button onClick={() => {
            this.setState({battery: battery - 1})
          }}>Press
          </button>
          <button onClick={() => {
            this.setState({online: !online})
          }}>Switch
          </button>
          <Middle/>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }


}

export default App;