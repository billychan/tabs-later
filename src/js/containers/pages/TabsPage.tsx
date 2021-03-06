import * as React from 'react';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';
import sortBy from 'lodash/sortBy';

import { AppState } from 'rootReducer';

import { getAllItems } from 'common/selectors';
import { focusTab } from 'services/browserTabs';

import * as tabsActions from 'features/tabs/tabsActions';

import LinksPage from 'components/pages/LinksPage';
import pluralize from "pluralize";

import BulkAddToListButton from 'components/buttons/BulkAddToListButton';
import BulkCloseDuplicationsButton from 'components/buttons/BulkCloseDuplicationsButton';
import BulkDeleteButton from 'components/buttons/BulkDeleteButton';
import BulkCopyUrlsButton from 'components/buttons/BulkCopyUrlsButton';
import CopyTextButton from 'components/buttons/CopyTextButton';
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
      itemName="tab"
      className="TabsPage"
      renderBulkOperations={({ selectedLinks }) => {
        return (
        <>
          <BulkAddToListButton
            links={selectedLinks as TabsLater.Link[]}
            showCloseTabOption
          />
          <BulkCloseDuplicationsButton
            tabs={selectedLinks as TabsLater.Tab[]}
            onConfirm={duplicatedLinks => {
              closeTabs(duplicatedLinks.map((tab: TabsLater.Tab) => tab.id));
            }}
          />
          <BulkCopyUrlsButton 
            links={selectedLinks}
          />
          <BulkDeleteButton
            links={selectedLinks}
            buttonText="Close selected tabs"
            noItemsWarning="Please select tabs to close."
            itemsWarning={`Going to close following ${pluralize(
              "tab",
              selectedLinks.length,
              true
            )}`}
            onConfirm={linksToClose => {
              closeTabs(linksToClose.map((tab: TabsLater.Tab) => tab.id));
            }}
          />
        </>
      )}}
      renderItemOperations={({ link }) => (
        <>
          <DeleteButton
            tooltip="Close tab"
            onClick={() => closeTabs([link.id])}
          />
          <CopyTextButton
            itemName="URL"
            text={link.url}
          />
          <OpenLinkButton
            tooltip="Go to tab"
            onClick={() => {
              focusTab(link.index);
            }}
          />
        </>
      )}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  tabs: sortBy(getAllItems(state.tabs), 'index')
});

export default connect(
  mapStateToProps,
  tabsActions,
)(cold(TabsPage));
