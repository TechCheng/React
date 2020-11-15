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
    this.action = {

      createItem: (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [newId]: newItem }
        })
      },

      deleteItem: (item) => {
        delete this.state.items[item]
        this.setState({
          items: this.state.items
        })
      }
    }
  }
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          action: this.action
        }}
      >
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