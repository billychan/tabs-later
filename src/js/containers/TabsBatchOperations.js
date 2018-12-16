import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions'

import Search from '../components/Search';
import BulkCheck from '../components/BulkCheck';

const TabsBatchOperations = ({ tabIds, checkTabs }) => (
    <section className="tabs-batch-operations">
      <BulkCheck onChange={(checked) => checkTabs(tabIds, checked)}/>
      <Search />
    </section>
  )
  
TabsBatchOperations.propTypes = {
  tabIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkTabs: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  tabIds: state.allIds
})

export default connect(
  mapStateToProps,
  actions
)(TabsBatchOperations)