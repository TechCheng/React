import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css'
import { flatternArr, parseToYearAndMonth, ID } from './utility'
import { testCategories, testItems } from './testData'
import Home from './containers/Home'
import Create from './containers/Create'


export const AppContext = React.createContext()
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state:this.state
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;