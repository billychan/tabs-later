import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllItems } from 'common/selectors';
import * as tabsActions from '../features/tabs/tabsActions';

import Tab from '../components/Tab';
import TabsBulkOperations from './TabsBulkOperations';

const TabsContainer = ({ tabs, checkTab }) => (
  <section className="tabs-container">
    <TabsBulkOperations />
    <ul className="tabs-list">
      {
          tabs.map(tab => (
            <Tab
              {...tab}
              key={tab.id}
              onChange={(tabId, checked) => checkTab(tabId, checked)}
            />
          ))
        }
    </ul>
  </section>
);

const mapStateToProps = state => ({
  tabs: getAllItems(state.tabs),
});

TabsContainer.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkTab: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  tabsActions,
)(TabsContainer);
