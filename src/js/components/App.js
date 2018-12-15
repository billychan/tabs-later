import React, { useState, useEffect } from "react";
import { cold } from 'react-hot-loader';
import { Tab as UiTab, Tabs as UiTabs, FocusStyleManager } from "@blueprintjs/core";

import TabsContainer from '../containers/TabsContainer';
import SavedListsContainer from '../containers/SavedListsContainer';

const App = () => {
  const [currentTabId, setCurrentTabId] = useState('browserTabs');

  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs();
  }, [])

  return (
    <section className="app-container">
      <UiTabs id="app-tabs"
        onChange={setCurrentTabId}
        selectedTabId={currentTabId}
        renderActiveTabPanelOnly
      >
        <UiTab id="browserTabs" title="Current" panel={<TabsContainer />} />
        <UiTab id="savedLists" title="Saved" panel={<SavedListsContainer />} />
      </UiTabs>
    </section>
  )
}

export default cold(App);