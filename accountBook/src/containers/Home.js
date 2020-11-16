import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import logo from '../logo.svg'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, Colors, parseToYearAndMonth, padLeft } from '../utility'
import PriceList from '../components/PriceList'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'
import ViewTab from '../components/ViewTab'
import { Tabs, Tab } from '../components/Tabs'
import { withRouter } from 'react-router-dom'
import WithContext from '../WithContext'

export const categories = {
  "1": {
    "type": TYPE_INCOME,
    "name": "旅行",
    "iconName": "ios-plane"
  },
  "2": {
    "type": TYPE_OUTCOME,
    "name": "旅行",
    "iconName": "ios-plane"
  },
  "3": {
    "type": TYPE_OUTCOME,
    "name": "旅行",
    "iconName": "ios-plane"
  }
}
export const items = [
  {
    "id": 1,
    "title": "去云南旅游",
    "price": 200,
    "date": "2020-09-10",
    "cid": 1
  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 300,
    "date": "2020-11-10",
    "cid": 2
  }
]
const newItem = {
  "id": 3,
  "title": "去上海旅游",
  "price": 300,
  "date": "2020-12-10",
  "cid": '3'
}

const tabText = [LIST_VIEW, CHART_VIEW]
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      tabView: LIST_VIEW
    }
  }

  componentDidMount() {
    this.props.action.getInitalData()
  }

  changeView = (view) => {
    this.setState({
      tabView: view
    })
  }
  changeDate = (year, month) => {
    this.props.action.selectNewMonth(year, month)
  }
  createItem = () => {
    // this.setState({
    //   items: [newItem, ...this.state.items]
    // })
    this.props.history.push('/create')
  }
  modifyItem = (item) => {
    // const modifyItems = this.state.items.map(item => {
    //   if (item.id == modifyItem.id) {
    //     return { ...item, 'title': '修改后的数据' }
    //   } else {
    //     return item
    //   }
    // })
    // this.setState({
    //   items: modifyItems
    // })
    this.props.history.push(`/edit/${item.id}`)
  }
  deleteItem = (item) => {
    // this.setState({
    //   items: this.state.items.filter(item => item.id !== deleteItem.id)
    // })
    const { deleteItem } = this.props.action
    deleteItem(item.id)
  }

  render() {
    const { tabView } = this.state
    const { items, categories, currentDate } = this.props.data

    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })
    let totalIncome = 0, totalOutcome = 0
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })
    return (
      <div className="App">

        <TotalPrice
          income={totalIncome}
          outcome={totalOutcome}
        />
        <Tabs activeIndex={tabText.findIndex(item => item == tabView)}
          onTabChange={(index) => this.setState({
            tabView: tabText[index]
          })}>
          <Tab><Ionicon
            className="rounded-circle mr-2"
            fontSize="25px"
            color={'#007bff'}
            icon='ios-paper'
          />
            列表模式 </Tab>
          <Tab><Ionicon
            className="rounded-circle mr-2"
            fontSize="25px"
            color={'#007bff'}
            icon='ios-pie'
          />
            图表模式</Tab>
        </Tabs>
        <MonthPicker
          year={currentDate.year}
          month={currentDate.month}
          onChange={this.changeDate}
        />
        <CreateBtn
          onClick={this.createItem}
        />
        {
          tabView == LIST_VIEW && <PriceList
            items={itemsWithCategory}
            onModifyItem={this.modifyItem}
            onDeleteItem={this.deleteItem}
          />
        }
        {
          tabView == CHART_VIEW && <h1>这里是图标</h1>
        }

      </div>
    );
  }
}

export default WithContext(withRouter(Home));