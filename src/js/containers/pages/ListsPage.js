import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';
import * as listsActions from 'features/lists/listsActions';

import { getAllItems } from 'common/selectors';

import { showSuccessMessage } from 'components/uiHelpers';
import Footer from 'components/blocks/Footer';
import ExtendedListItem from 'components/blocks/ExtendedListItem';
import ListDetailsPage from 'components/pages/ListDetailsPage';
import { OpenLinkButton } from 'components/buttons/ButtonWithTooltip';

import BulkOpenUrlsButton from 'components/buttons/BulkOpenUrlsButton';
import { openTabsOnBrowser } from 'services/browserTabs';

import { listLinksToLinksArray } from 'features/lists/listsEntityUtils';

/**
 * Note openTabsOnBrowser makes side effect directly. The reason not going through an action
 * creator is there is no suitable action to update state. Normally fetching all tabs again is
 * expected after new tab opened, but the new tab info will be empty if fetched immediately after
 * creation since it's not fully loaded yet, so it's better just refreshing info when displaying
 * tabs list page.
 */
const ListsPage = ({
  lists, updateList, deleteList, openPanel, tabs,
}) => (
  <section className="ListsPage">
    <ul className="ListsPage_lists ListItems">
      {
        lists.map(list => (
          <ExtendedListItem
            {...list}
            key={list.id}
            onSave={(name) => {
              updateList(list, { name })
                .then(() => showSuccessMessage(`List "${name}" updated`));
            }}
            onDeletion={() => {
              deleteList(list)
                .then(() => showSuccessMessage(`List "${list.name}" removed`));
            }}
            onClick={() => {
              openPanel({
                component: ListDetailsPage,
                title: list.name,
                props: {
                  links: listLinksToLinksArray(list),
                  /* eslint-disable react/prop-types */
                  // selectedLinks is an argument passing around, not really prop of this component
                  renderBulkOperations: ({ selectedLinks }) => (
                    <BulkOpenUrlsButton
                      urls={selectedLinks.map(link => link.url)}
                      existingTabUrls={tabs.map(tab => tab.url)}
                      onOpenUrls={urls => openTabsOnBrowser(urls)}
                    />
                  ),
                  renderItemOperations: ({ link }) => (
                    <OpenLinkButton
                      tooltip="Open link in new tab"
                      onClick={() => openTabsOnBrowser([link.url])}
                    />
                  ),
                },
              });
            }}
          />
        ))
      }
    </ul>
    <Footer>
      <section className="PageBottom">
        <span className="PageBottomHints">
          {`${lists.length} lists`}
        </span>
      </section>
    </Footer>
  </section>
);

ListsPage.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
  tabs: getAllItems(state.tabs),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(ListsPage));
