import React, { createContext } from 'react';

const BatteryContext = createContext(90)  // 步骤1
const OnlineContext = createContext()


class Leaf extends React.Component {
  static contextType = BatteryContext   // 步骤2
  static contextType = BatteryContext
  render() {
    const battery = this.context   // 步骤3
    return (
      <React.Fragment>
        <h1>Battery: {battery}</h1>
        <OnlineContext.Consumer>
          {
            online => <h1> Online: {String(online)}</h1>
          }
        </OnlineContext.Consumer>
      </React.Fragment>
    )
  }
}

function Middle() {
  return (
    <Leaf />
  )
}

class App extends React.Component {
  state = {
    battery: 60,
    online: false
  }

  render() {
    const { battery, online } = this.state

    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button onClick={() => {
            this.setState({ battery: battery - 1 })
          }}>Press
          </button>
          <button onClick={() => {
            this.setState({ online: !online })
          }}>Switch
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }


}

export default Context;