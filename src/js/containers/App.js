import React, { useState, useEffect } from "react";
import { cold } from 'react-hot-loader';
import { Tab, Tabs } from "@blueprintjs/core";

import BrowserTabsContainer from './BrowserTabsContainer';
import SavedListsContainer from './SavedListsContainer';

import { FocusStyleManager } from "@blueprintjs/core";

import '@blueprintjs/core/lib/css/blueprint';
import '@blueprintjs/icons/lib/css/blueprint-icons';
import '../../css/main.scss';

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
        renderActiveTabPanelOnly={true}
      >
        <Tab id="browserTabs" title="Current" panel={<BrowserTabsContainer />} />
        <Tab id="savedLists" title="Saved" panel={<SavedListsContainer />} />
      </Tabs>
    </section>
  )
}

export default cold(App);