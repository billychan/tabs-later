import React, { useState, useEffect } from "react";
import { cold } from 'react-hot-loader';
import { Tab, Tabs } from "@blueprintjs/core";

import { FocusStyleManager } from "@blueprintjs/core";
import BrowserTabsContainer from '../containers/BrowserTabsContainer';
import SavedListsContainer from '../containers/SavedListsContainer';

const App = () => {
  const [currentTabId, setCurrentTabId] = useState('browserTabs');

  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs();
  }, [])

  return (
    <section className="app-container">
      <Tabs id="app-tabs"
        onChange={setCurrentTabId}
        selectedTabId={currentTabId}
        renderActiveTabPanelOnly
      >
        <Tab id="browserTabs" title="Current" panel={<BrowserTabsContainer />} />
        <Tab id="savedLists" title="Saved" panel={<SavedListsContainer />} />
      </Tabs>
    </section>
  )
}

export default cold(App);