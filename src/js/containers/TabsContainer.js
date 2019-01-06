import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getAllTabs } from '../reducers/tabs';

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
  tabs: getAllTabs(state.tabs),
});

TabsContainer.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkTab: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  actions,
)(TabsContainer);
