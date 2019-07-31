import * as React from 'react';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';
import { Tab as UiTab, Tabs as UiTabs, FocusStyleManager } from '@blueprintjs/core';
import { fetchLists as fetchListsAction } from 'features/lists/listsActions';

import TabsPage from 'containers/pages/TabsPage';
import ListsPagePanel from 'components/pages/ListsPagePanel';

interface AppProps {
  fetchLists: TabsLater.ThenableActionCreator;
}

const { useEffect } = React;

const App = ({ fetchLists }: AppProps) => {
  useEffect(() => {
    FocusStyleManager.onlyShowFocusOnTabs();
    fetchLists();
  }, []);

  return (
    <section className="app-container">
      <UiTabs
        id="app-tabs"
        className="p-2"
        renderActiveTabPanelOnly
      >
        <UiTab id="browserTabs" title="Current Tabs" panel={<TabsPage />} className="mt-3" />
        <UiTab id="savedLists" title="Saved Lists" panel={<ListsPagePanel />} className="mt-3" />
      </UiTabs>
    </section>
  );
};

export default connect(
  () => ({}),
  {
    fetchLists: fetchListsAction,
  },
)(cold(App));
