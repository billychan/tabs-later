import React from 'react';
import { PanelStack } from '@blueprintjs/core';
import ListsPage from 'containers/pages/ListsPage';

const ListsPagePanel = () => (
  <section className="ListsPagePanel">
    <PanelStack initialPanel={{
      component: ListsPage,
    }}
    />
  </section>
);

export default ListsPagePanel;
