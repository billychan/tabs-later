import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cold } from 'react-hot-loader';

import { getAllItems, getItemById } from 'common/selectors';
import { maybePluralize } from 'common/helpers';

import * as listsActions from 'features/lists/listsActions';
import { listLinksToLinksArray } from 'features/lists/entity/utils';

import LinksPage from 'components/pages/LinksPage';
import { OpenLinkButton } from 'components/buttons/ButtonWithTooltip';
import BulkOpenUrlsButton from 'components/buttons/BulkOpenUrlsButton';
import BulkDeleteButton from 'components/buttons/BulkDeleteButton';
import BulkAddToListButton from 'components/buttons/BulkAddToListButton';
import ExportLinksButton from 'components/buttons/ExportLinksButton';
import ImportLinksButton from 'components/buttons/ImportLinksButton';
import { DeleteButtonWithConfirmation } from 'components/buttons/ButtonWithConfirmation';

import { showSuccessMessage } from 'components/uiHelpers';

import { openTabsOnBrowser } from 'services/browserTabs';

const ListDetailsPage = ({
  list,
  tabs,
  removeLinksFromList,
  importLinksToList,
}) => (
  <LinksPage
    links={listLinksToLinksArray(list)}
    renderBulkOperations={({ selectedLinks }) => (
      <>
        <BulkOpenUrlsButton
          urls={selectedLinks.map(link => link.url)}
          existingTabUrls={tabs.map(tab => tab.url)}
          onOpenUrls={urls => openTabsOnBrowser(urls)}
        />
        <BulkAddToListButton
          links={selectedLinks}
          actionMode="move"
          targetName="link"
          sourceList={list}
        />
        <ExportLinksButton
          links={selectedLinks}
        />
        <ImportLinksButton
          onImported={({ results }) => {
            importLinksToList(list, results).then(() => {
              showSuccessMessage('Links imported successfully');
            });
          }}
        />
        <BulkDeleteButton
          links={selectedLinks}
          buttonText="Delete selected links"
          noItemsWarning="Please select links to delete."
          itemsWarning={
            `Going to delete following ${maybePluralize(selectedLinks.length, 'link', 'links')}`
          }
          onConfirm={(links) => {
            removeLinksFromList(list, links)
              .then(() => showSuccessMessage(
                `${links.length} links deleted: ${links.map(link => link.url).join(' \n')}`,
              ));
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
            removeLinksFromList(list, [link])
              .then(() => showSuccessMessage(`Link removed: ${link.url}`));
          }}
        />
        <OpenLinkButton
          tooltip="Open link in new tab"
          onClick={() => openTabsOnBrowser([link.url])}
        />
      </>
    )}
  />
);

/* eslint-disable react/no-unused-prop-types */
// listId only needed once when looking for list from state, omit it from esling checking.
// It must be the id but not a list object, so that the real list is from store, and
// container got updated when list changes.
ListDetailsPage.propTypes = {
  listId: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeLinksFromList: PropTypes.func.isRequired,
  importLinksToList: PropTypes.func.isRequired,
  list: PropTypes.object,
};

ListDetailsPage.defaultProps = {
  list: {},
};

const mapStateToProps = (state, ownProps) => ({
  tabs: getAllItems(state.tabs),
  list: getItemById(state.lists.byId, ownProps.listId),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(ListDetailsPage));
