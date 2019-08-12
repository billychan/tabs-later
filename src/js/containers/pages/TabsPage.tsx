import * as React from 'react';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { AppState } from 'rootReducer';

import { getAllItems } from 'common/selectors';
import { focusTab } from 'services/browserTabs';

import * as tabsActions from 'features/tabs/tabsActions';

import LinksPage from 'components/pages/LinksPage';
import pluralize from "pluralize";

import BulkAddToListButton from 'components/buttons/BulkAddToListButton';
import BulkCloseDuplicationsButton from 'components/buttons/BulkCloseDuplicationsButton';
import BulkDeleteButton from 'components/buttons/BulkDeleteButton';
import { DeleteButton, OpenLinkButton } from 'components/buttons/ButtonWithTooltip';

interface TabsPageProps {
  tabs: TabsLater.Tab[];
  fetchAllTabs: TabsLater.ThenableActionCreator;
  closeTabs: TabsLater.EventHandler;
}

const { useEffect } = React;

const TabsPage = ({ tabs, fetchAllTabs, closeTabs }: TabsPageProps) => {
  useEffect(() => {
    fetchAllTabs();
  }, []);
  return (
    <LinksPage
      links={tabs}
      className="TabsPage"
      renderBulkOperations={({ selectedLinks }) => (
        <>
          <BulkAddToListButton links={selectedLinks as TabsLater.Link[]} />
          <BulkCloseDuplicationsButton
            tabs={selectedLinks}
            onConfirm={duplicatedLinks => {
              closeTabs(duplicatedLinks.map((tab: TabsLater.Tab) => tab.id));
            }}
          />
          <BulkDeleteButton
            links={selectedLinks}
            buttonText="Close selected tabs"
            noItemsWarning="Please select tabs to close."
            itemsWarning={`Going to close following ${pluralize('tab', selectedLinks.length, true)}`}
            onConfirm={linksToClose => {
              closeTabs(linksToClose.map((tab: TabsLater.Tab) => tab.id));
            }}
          />
        </>
      )}
      renderItemOperations={({ tab }) => (
        <>
          <DeleteButton
            tooltip="Close tab"
            onClick={() => closeTabs([tab.id])}
          />
          <OpenLinkButton
            tooltip="Go to tab"
            onClick={() => {
              focusTab(tab.index);
            }}
          />
        </>
      )}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  tabs: getAllItems(state.tabs),
});

export default connect(
  mapStateToProps,
  tabsActions,
)(cold(TabsPage));
