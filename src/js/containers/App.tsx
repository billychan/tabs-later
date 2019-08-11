import * as React from 'react';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { Route, HashRouter, Switch } from 'react-router-dom';

import { fetchLists as fetchListsAction } from 'features/lists/listsActions';

import { FocusStyleManager } from "@blueprintjs/core";

import NavBar from 'containers/global/navbar';

import TabsPage from 'containers/pages/TabsPage';
import ListsPagePanel from 'components/pages/ListsPagePanel';

interface AppProps {
  fetchLists: TabsLater.ThenableActionCreator;
}

const { useEffect } = React;

const App = ({ fetchLists }: AppProps) => {
  useEffect(() => {
    fetchLists();
    FocusStyleManager.onlyShowFocusOnTabs();
  }, []);

  return (
    <HashRouter>
      <NavBar />
      <section className="p-2">
        <Switch>
          <Route exact path='/' component={TabsPage} />
          <Route path='/lists' component={ListsPagePanel} />
        </Switch>
      </section>
    </HashRouter>
  );
};

export default connect(
  () => ({}),
  {
    fetchLists: fetchListsAction,
  },
)(cold(App));
