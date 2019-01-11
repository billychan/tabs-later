import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllIds } from 'common/selectors';
import * as tabsActions from '../features/tabs/tabsActions';
import { getCheckedStatus } from '../features/tabs/tabsSelectors';

import Search from '../components/Search';
import BulkCheck from '../components/BulkCheck';
import BulkAddToList from '../components/BulkAddToList';

const TabsBulkOperations = ({ tabIds, checkTabs, checkedStatus }) => (
  <section className="tabs-batch-operations">
    <BulkCheck
      checkedStatus={checkedStatus}
      onChange={checked => checkTabs(tabIds, checked)}
    />
    <Search />
    <BulkAddToList />
  </section>
);

TabsBulkOperations.propTypes = {
  tabIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkTabs: PropTypes.func.isRequired,
  checkedStatus: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  tabIds: getAllIds(state.tabs),
  checkedStatus: getCheckedStatus(state.tabs),
});

export default connect(
  mapStateToProps,
  tabsActions,
)(TabsBulkOperations);
