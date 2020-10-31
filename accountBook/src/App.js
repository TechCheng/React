import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { LIST_VIEW, CHART_VIEW } from './utility'

import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import TotalPrice from './components/TotalPrice'
import MonthPicker from './components/MonthPicker'

const items = [
  {
    "id": 1,
    "title": "去云南旅游",
    "price": 200,
    "date": "2018-09-10",
    "category": {
      "id": 1,
      "name": "旅行",
      "iconName": "ios-plane"
    }
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 400,
    "date": "2018-11-10",
    "category": {
      "id": 2,
      "name": "旅行",
      "iconName": "ios-plane"
    }
  }
]
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: LIST_VIEW,
      year: 2020,
      month: 10
    }
  }
  render() {
    const { activeTab, year, month } = this.state
    return (
      <div className="App">

        <TotalPrice
          income={100}
          outcome={200}
        />
        <ViewTab
          activeTab={activeTab}
          onTabChange={(view) => {
            this.setState({
              activeTab: view
            })
          }}
        />
        <MonthPicker
          year={year}
          month={month}
          onChange={(year, month) => {
            this.setState({
              year,
              month
            })
          }}
        />
        <PriceList
          items={items}
          onModifyItem={item => { }}
          onDeleteItem={item => { }}
        />

      </div>
    );
  }
}

export default App;