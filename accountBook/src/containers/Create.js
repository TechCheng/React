import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import PriceForm from '../components/PriceForm'
// import Loader from '../components/Loader'
import { TYPE_INCOME, TYPE_OUTCOME, ID } from '../utility'
import { AppContext } from '../App'
import WithContext from '../WithContext'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true,
    }
  }
  componentDidMount() {
    // const { id } = this.props.match.params
    // this.props.actions.getEditData(id).then(data => {
    //   const { editItem, categories } = data
    //   this.setState({
    //     selectedTab: (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
    //     selectedCategory: (id && editItem) ? categories[editItem.cid] : null,
    //   })
    // })
  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index]
    })
  }
  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }
  cancelSubmit = () => {
    this.props.history.push('/')
  }
  submitForm = (data, isEditMode) => {
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false
      })
      return
    }
    if (!isEditMode) {
      // create
      this.props.action.createItem(data, this.state.selectedCategory.id)
    } else {
      // update 
      this.props.action.updateItem(data, this.state.selectedCategory.id)
    }
    this.props.history.push('/')
  }

  navigateToHome = () => {
    this.props.history.push('/')
  }

  render() {
    const { tabIndex, selectedCategory, validationPassed, selectedTab } = this.state
    const { items, categories } = this.props.data

    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type == selectedTab).map(id => categories[id])
    return (
      < AppContext.Consumer >
        {
          ({ state }) => {
            return <div className="create-page py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
              <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
                <Tab>支出</Tab>
                <Tab>收入</Tab>
              </Tabs>
              <CategorySelect categories={filterCategories}
                onSelectCategory={this.selectCategory}
                selectedCategory={selectedCategory}
              />
              <PriceForm
                onFormSubmit={this.submitForm}
                onCancelSubmit={this.cancelSubmit}
              // item={editItem}
              />
              {!validationPassed &&
                <div className="alert alert-danger mt-5" role="alert">
                  请选择分类信息
            </div>
              }
            </div>
          }
        }
      </AppContext.Consumer>
    )
  }
}

Create.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
}

export default WithContext(withRouter(Create))