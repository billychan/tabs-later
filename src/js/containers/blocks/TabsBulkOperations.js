import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllIds } from 'common/selectors';
import * as tabsActions from 'features/tabs/tabsActions';
import { getCheckedStatus, getCheckedTabsCount } from 'features/tabs/tabsSelectors';

import SearchInput from 'components/formControls/SearchInput';
import BulkCheck from 'components/formControls/BulkCheck';
import BulkAddToListButton from 'components/buttons/BulkAddToListButton';

const TabsBulkOperations = ({
  tabIds, checkTabs, checkedStatus, numberOfTabs, onSearch,
}) => (
  <section className="BulkOperations">
    <BulkCheck
      checkedStatus={checkedStatus}
      onChange={checked => checkTabs(tabIds, checked)}
    />
    <SearchInput
      onSearch={query => onSearch(query)}
    />
    <BulkAddToListButton enabled={checkedStatus > 0} numberOfTabsToAdd={numberOfTabs} />
  </section>
);

TabsBulkOperations.propTypes = {
  tabIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkTabs: PropTypes.func.isRequired,
  checkedStatus: PropTypes.number.isRequired,
  numberOfTabs: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tabIds: getAllIds(state.tabs),
  checkedStatus: getCheckedStatus(state.tabs),
  numberOfTabs: getCheckedTabsCount(state.tabs),
});

export default connect(
  mapStateToProps,
  tabsActions,
)(TabsBulkOperations);
