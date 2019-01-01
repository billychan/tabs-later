import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';
import { Tab as UiTab, Tabs as UiTabs, FocusStyleManager } from '@blueprintjs/core';
import * as actions from '../actions';

import TabsContainer from './TabsContainer';
import SavedListsContainer from './SavedListsContainer';

const App = ({ fetchAllTabs }) => {
  const [currentTabId, setCurrentTabId] = useState('browserTabs');

  useEffect(() => {
    fetchAllTabs();
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
        <UiTab id="browserTabs" title="Current" panel={<TabsContainer />} />
        <UiTab id="savedLists" title="Saved" panel={<SavedListsContainer />} />
      </UiTabs>
    </section>
  );
};

App.propTypes = {
  fetchAllTabs: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  actions,
)(cold(App));
