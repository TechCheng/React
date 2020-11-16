import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css'
import axios from 'axios'
import { flatternArr, parseToYearAndMonth, ID } from './utility'
import Home from './containers/Home'
import Create from './containers/Create'


export const AppContext = React.createContext()
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth()
    }
    this.action = {
      getInitalData: async () => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)]).then(results => {
          console.log('[result]', results)
          const [categories, items] = results
          this.setState({
            items: flatternArr(items.data),
            categories: flatternArr(categories.data),
            isLoading: false,
          })
          return { items, categories }
        })
      },
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

      updateItem: (item, updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
        })
      },
      selectNewMonth: async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        await axios.get(getURLWithData).then(items => {
          this.setState({
            items: flatternArr(items.data),
            currentDate: { year, month },
            isLoading: false,
          })
          return items
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