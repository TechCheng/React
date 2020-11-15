import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { AppContext } from './App'

export default function WithContext(Component) {
  class Index extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        < AppContext.Consumer >
          {
            ({ state, action }) => {
              return <Component {...this.props} data={state} action={action} />
            }
          }
        </AppContext.Consumer>
      )
    }
  }

  return hoistStatics(Index, Component)
}