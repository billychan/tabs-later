import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';
import { Tab as UiTab, Tabs as UiTabs, FocusStyleManager } from '@blueprintjs/core';
import { fetchAllTabs as fetchAllTabsAction } from '../features/tabs/tabsActions';
import { fetchLists as fetchListsAction } from '../features/lists/listsActions';

import TabsContainer from './TabsContainer';
import SavedListsContainer from './SavedListsContainer';

const App = ({ fetchAllTabs, fetchLists }) => {
  const [currentTabId, setCurrentTabId] = useState('browserTabs');

  useEffect(() => {
    fetchAllTabs();
    fetchLists();
    FocusStyleManager.onlyShowFocusOnTabs();
  }, []);

  return (
    <section className="app-container">
      <UiTabs
        id="app-tabs"
        onChange={setCurrentTabId}
        selectedTabId={currentTabId}
        renderActiveTabPanelOnly
      >
        <UiTab id="browserTabs" title="Current Tabs" panel={<TabsContainer />} />
        <UiTab id="savedLists" title="Saved Lists" panel={<SavedListsContainer />} />
      </UiTabs>
    </section>
  );
};

App.propTypes = {
  fetchAllTabs: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  {
    fetchAllTabs: fetchAllTabsAction,
    fetchLists: fetchListsAction,
  },
)(cold(App));
