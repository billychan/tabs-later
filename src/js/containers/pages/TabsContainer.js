import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllItems } from 'common/selectors';
import * as tabsActions from 'features/tabs/tabsActions';

import Tab from 'components/Tab';
import TabsBulkOperations from 'containers/blocks/TabsBulkOperations';

const TabsContainer = ({ tabs, checkTab }) => (
  <div>
    <TabsBulkOperations />
    <section className="tabs-collection-container">
      <div className="scrollable-section">
        <ul className="item-rows-ul ">
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
      </div>
    </section>
  </div>
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
