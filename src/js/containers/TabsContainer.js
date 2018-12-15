import React, { useEffect, Component } from "react";
// import { cold } from 'react-hot-loader';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions'
import { getAllTabs } from '../reducers';

import TabsList from '../components/TabsList';
import TabsBatchOperations from '../components/TabsBatchOperations';

// const TabsContainer = ({ tabs }) => {
//   useEffect(fetchAllTabs)
// }

class TabsContainer extends Component {
  componentDidMount() {
    const { fetchAllTabs } = this.props
    fetchAllTabs()
  }

  render() {
    const { tabs } = this.props
    return (
      <section className="tabs-container">
        <TabsBatchOperations />
        <TabsList tabs={tabs} />
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: getAllTabs(state)
})

// TabsContainer.propTypes = {
//   tabs: PropTypes.arrayOf(PropTypes.object).isRequired
// }

export default connect(
  mapStateToProps,
  actions
)(TabsContainer)