import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions'
import { getAllTabIds, getCheckedStatus } from '../reducers'

import Search from '../components/Search';
import BulkCheck from '../components/BulkCheck';

const TabsBatchOperations = ({ tabIds, checkTabs, checkedStatus }) => (
    <section className="tabs-batch-operations">
      <BulkCheck
        checkedStatus={checkedStatus}
        onChange={(checked) => checkTabs(tabIds, checked)}
      />
      <Search />
    </section>
  )
  
TabsBatchOperations.propTypes = {
  tabIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkTabs: PropTypes.func.isRequired,
  checkedStatus: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  tabIds: getAllTabIds(state),
  checkedStatus: getCheckedStatus(state)
})

export default connect(
  mapStateToProps,
  actions
)(TabsBatchOperations)