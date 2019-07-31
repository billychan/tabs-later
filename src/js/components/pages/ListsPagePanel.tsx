import * as React from 'react';
import { PanelStack } from '@blueprintjs/core';
import ListsPage from 'containers/pages/ListsPage';

const ListsPagePanel = () => (
  <section className="ListsPagePanel">
    <PanelStack initialPanel={{
      component: ListsPage,
      title: 'All Lists',
    }}
    />
  </section>
);

export default ListsPagePanel;
