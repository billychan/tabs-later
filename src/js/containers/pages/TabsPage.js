import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { getAllItems } from 'common/selectors';
import { focusTab } from 'services/browserTabs';
import * as tabsActions from 'features/tabs/tabsActions';

import TabItem from 'components/blocks/TabItem';
import TabItemActions from 'components/blocks/TabItemActions';
import TabsBulkOperations from 'containers/blocks/TabsBulkOperations';

const TabsPage = ({ tabs, checkTab, fetchAllTabs }) => {
  useEffect(() => {
    fetchAllTabs();
  }, []);
  return (
    <div className="TabsPage">
      <TabsBulkOperations />
      <section className="TabsPage__tabs">
        <ul className="TabItems">
          {
              tabs.map(tab => (
                <TabItem
                  {...tab}
                  key={tab.id}
                  onChange={(tabId, checked) => checkTab(tabId, checked)}
                >
                  <TabItemActions onOpeningLink={() => {
                    focusTab(tab.index);
                  }}
                  />
                </TabItem>
              ))
            }
        </ul>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  tabs: getAllItems(state.tabs),
});

TabsPage.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkTab: PropTypes.func.isRequired,
  fetchAllTabs: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  tabsActions,
)(cold(TabsPage));