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
import Loader from '../components/Loader'
import { Tabs, Tab } from '../components/Tabs'
import { withRouter } from 'react-router-dom'
import WithContext from '../WithContext'

const tabsText = [LIST_VIEW, CHART_VIEW]
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const { items, categories, currentDate, isLoading } = this.props.data
    const tabIndex = tabsText.findIndex(tabText => tabText === tabView)
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
      <React.Fragment>
        <div className="App-header">
            <div className="row mb-5 justify-content-center">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="row">
              <div className="col">
                <MonthPicker
                  year={currentDate.year}
                  month={currentDate.month}
                  onChange={this.changeDate}
                />
              </div>
              <div className="col">
                <TotalPrice
                  income={totalIncome}
                  outcome={totalOutcome}
                />
              </div>
            </div>
          </div>
          <div className="content-area py-3 px-3">
            { isLoading &&
              <Loader />
            }
            { !isLoading &&
            <React.Fragment>
            <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
              <Tab>
                <Ionicon 
                  className="rounded-circle mr-2" 
                  fontSize="25px"
                  color={Colors.blue}
                  icon='ios-paper'
                />
                列表模式
              </Tab>
              <Tab>
                <Ionicon 
                  className="rounded-circle mr-2" 
                  fontSize="25px"
                  color={Colors.blue}
                  icon='ios-pie'
                />
                图表模式
              </Tab>
            </Tabs>
            <CreateBtn onClick={this.createItem} />
            { tabView === LIST_VIEW && itemsWithCategory.length > 0 &&
              <PriceList 
                items={itemsWithCategory}
                onModifyItem={this.modifyItem}
                onDeleteItem={this.deleteItem}
              />
            }
            { tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
              <div className="alert alert-light text-center no-record">
                您还没有任何记账记录
              </div>
            }
            { tabView === CHART_VIEW &&
              <React.Fragment>
                {/* <PieChart title="本月支出" categoryData={chartOutcomDataByCategory} />
                <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} /> */}
              </React.Fragment>
            }
            </React.Fragment>
          }
          </div>
        </React.Fragment>
    )
  }
}

export default WithContext(withRouter(Home));