import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';
import { Tab as UiTab, Tabs as UiTabs, FocusStyleManager } from '@blueprintjs/core';
import { fetchLists as fetchListsAction } from 'features/lists/listsActions';

import TabsPage from 'containers/pages/TabsPage';
import ListsPagePanel from 'components/pages/ListsPagePanel';

const App = ({ fetchLists }) => {
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

App.propTypes = {
  fetchLists: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  {
    fetchLists: fetchListsAction,
  },
)(cold(App));
