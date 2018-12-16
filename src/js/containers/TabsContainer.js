import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions'
import { getAllTabs } from '../reducers';

import Tab from '../components/Tab';
import TabsBatchOperations from './TabsBatchOperations';

class TabsContainer extends Component {
  componentDidMount() {
    const { fetchAllTabs } = this.props
    fetchAllTabs()
  }

  render() {
    const { tabs, checkTab } = this.props
    return (
      <section className="tabs-container">
        <TabsBatchOperations />
        <ul className="tabs-list">
          {
            tabs.map((tab) =>
              <Tab
                {...tab}
                key={tab.id}
                onChange={(tabId, checked) => checkTab(tabId, checked)}
              />
            )
          }
        </ul>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: getAllTabs(state)
})

TabsContainer.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllTabs: PropTypes.func.isRequired,
  checkTab: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  actions
)(TabsContainer)