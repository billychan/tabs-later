import * as React from 'react';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { AppState } from 'rootReducer';

import { getAllItems, getItemById } from 'common/selectors';
import pluralize from "pluralize";

import * as listsActions from 'features/lists/listsActions';
import * as tabsActions from 'features/tabs/tabsActions';

import LinksPage from 'components/pages/LinksPage';
import { OpenLinkButton, CopyButton } from 'components/buttons/ButtonWithTooltip';
import BulkOpenUrlsButton from 'components/buttons/BulkOpenUrlsButton';
import BulkDeleteButton from 'components/buttons/BulkDeleteButton';
import BulkAddToListButton from 'components/buttons/BulkAddToListButton';
import ExportLinksButton from 'components/buttons/ExportLinksButton';
import ImportLinksButton from 'components/buttons/ImportLinksButton';
import CopyTextButton from 'components/buttons/CopyTextButton';
import { DeleteButtonWithConfirmation } from 'components/buttons/ButtonWithConfirmation';

import { showSuccessMessage } from 'components/uiHelpers';

const { useEffect } = React;

interface ListDetailsPageProps {
  list: TabsLater.List;
  tabs: TabsLater.Tab[];
  removeLinksFromList: TabsLater.ThenableActionCreator;
  importLinksToList: TabsLater.ThenableActionCreator;
  openTabs: TabsLater.ActionCreator;
  fetchAllTabs: TabsLater.ActionCreator;
}

const ListDetailsPage = ({
  list,
  tabs,
  removeLinksFromList,
  importLinksToList,
  openTabs,
  fetchAllTabs,
}: ListDetailsPageProps) => {
  useEffect(() => {
    fetchAllTabs();
  }, []);
  const links = Object.values(list.links);
  return (
    <LinksPage
      links={links}
      renderBulkOperations={({ selectedLinks }) => (
        <>
          <BulkOpenUrlsButton
            urls={selectedLinks.map((link: TabsLater.Link) => link.url)}
            existingTabUrls={tabs.map(tab => tab.url)}
            onOpenUrls={urls => openTabs(urls)}
          />
          <BulkAddToListButton
            links={selectedLinks}
            actionMode="move"
            targetName="link"
            sourceList={list}
          />
          <ExportLinksButton links={selectedLinks} />
          <ImportLinksButton
            onImported={({ results }) => {
              importLinksToList(list, results).then(() => {
                showSuccessMessage("Links imported successfully");
              });
            }}
          />
          <BulkDeleteButton
            links={selectedLinks}
            buttonText="Delete selected links"
            noItemsWarning="Please select links to delete."
            itemsWarning={`Going to delete following ${pluralize(
              "link",
              selectedLinks.length,
              true
            )}`}
            onConfirm={links => {
              removeLinksFromList(list, links).then(() =>
                showSuccessMessage(
                  `${pluralize("link", links.length, true)} deleted`
                )
              );
            }}
          />
        </>
      )}
      renderItemOperations={({ link }) => (
        <>
          <DeleteButtonWithConfirmation
            tooltip="Remove from list"
            confirmButtonText="Yes, remove it"
            text="Are you sure to remove this link from list?"
            onConfirm={() => {
              removeLinksFromList(list, [link]).then(() =>
                showSuccessMessage(`Link removed: ${link.url}`)
              );
            }}
          />
          <CopyTextButton
            itemName="URL"
            text={link.url}
          />
          <OpenLinkButton
            tooltip="Open link in new tab"
            onClick={() => openTabs([link.url])}
          />
        </>
      )}
    />
  );
};

const mapStateToProps = (state: AppState, ownProps: ListDetailsPageProps) => ({
  tabs: getAllItems(state.tabs),
  list: getItemById(state.lists.byId, ownProps.list.id),
});

export default connect(
  mapStateToProps,
  {
    ...listsActions,
    ...tabsActions,
  },
)(cold(ListDetailsPage));
