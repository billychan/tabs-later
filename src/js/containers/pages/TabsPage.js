import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { getAllItems } from 'common/selectors';
import { focusTab } from 'services/browserTabs';
import * as tabsActions from 'features/tabs/tabsActions';

import TabItem from 'components/blocks/TabItem';
import TabItemActions from 'components/blocks/TabItemActions';
import Footer from 'components/blocks/Footer';
import SelectedItemsHints from 'components/elements/SelectedItemsHints';
import TabsBulkOperations from 'containers/blocks/TabsBulkOperations';

const TabsPage = ({ tabs, checkTab, fetchAllTabs }) => {
  useEffect(() => {
    fetchAllTabs();
  }, []);
  const checkedCount = tabs.filter(tab => tab.checked).length;
  return (
    <div className="TabsPage">
      <TabsBulkOperations
        onSearch={(query) => {
          // console.log('search: ', query);
        }}
      />
      <section className="TabsPage__tabs">
        <ul className="TabItems">
          {
              tabs.map(tab => (
                <TabItem
                  {...tab}
                  key={tab.id}
                  onChange={(tabId, checked) => checkTab(tabId, checked)}
                >
                  <TabItemActions
                    onOpeningLink={() => { focusTab(tab.index); }}
                    openButtonTitle="Switch to tab"
                  />
                </TabItem>
              ))
            }
        </ul>
      </section>
      <Footer>
        <section className="PageBottom">
          <span className="PageBottomHints">
            <SelectedItemsHints selectedCount={checkedCount} totalCount={tabs.length} />
          </span>
        </section>
      </Footer>
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
