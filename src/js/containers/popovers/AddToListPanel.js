import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';
import { Button, Intent } from '@blueprintjs/core';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import { maybePluralize } from 'common/helpers';

import * as listsActions from 'features/lists/listsActions';
import { getUniqueLinks } from 'features/lists/listsEntityUtils';

import { showSuccessMessage } from 'components/uiHelpers';

import ListItem from 'components/blocks/ListItem';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import CreateListPanel from 'components/popovers/CreateListPanel';
import { ConfirmButton } from 'components/buttons/ButtonWithTooltip';

const savedMessage = (listName, links, actionMode) => {
  const verb = actionMode === 'add' ? 'saved' : 'moved';
  return `${maybePluralize(links.length, 'link')} ${verb} into list "${listName}"`;
};

const AddToListPanel = ({
  openPanel,
  lists,
  links,
  sourceList,
  actionMode,
  addTabsIntoList,
  moveTabsIntoList,
  createList,
}) => (
  <div className="panel-content">
    <section className="main-section scrollable">
      <ul className="ListItems">
        {
          lists.map((list) => {
            const uniqueLinksCount = getUniqueLinks(list, links).length;
            const tooltip = actionMode === 'add' ? 'Add to list' : 'Move to list';
            return (
              <ListItem {...list} key={list.id} mainCols={11} actionCols={1}>
                <ConfirmButton
                  disabled={!uniqueLinksCount}
                  intent={Intent.PRIMARY}
                  tooltip={uniqueLinksCount ? tooltip : 'Already in list'}
                  onClick={() => {
                    const promise = (actionMode === 'move' && sourceList)
                      ? moveTabsIntoList(sourceList, links, list)
                      : addTabsIntoList(list, links);
                    promise.then(() => {
                      showSuccessMessage(savedMessage(list.name, links, actionMode));
                    });
                  }}
                />
              </ListItem>
            );
          })
        }
      </ul>
    </section>
    <section className="actions">
      <Button
        text="New List"
        intent="primary"
        onClick={() => {
          openPanel({
            component: CreateListPanel,
            title: 'New List',
            props: {
              onConfirm({ listName }) {
                createList({ listName })
                  .then((newList) => {
                    showSuccessMessage(`New list "${listName}" created`);
                    return newList;
                  })
                  .then(newList => (
                    (actionMode === 'move' && sourceList)
                      ? moveTabsIntoList(sourceList, links, newList)
                      : addTabsIntoList(newList, links)
                  ))
                  .then(() => {
                    showSuccessMessage(savedMessage(listName, links, actionMode));
                  });
              },
            },
          });
        }}
      />
      <CancelPopoverButton />
    </section>
  </div>
);

AddToListPanel.propTypes = {
  openPanel: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTabsIntoList: PropTypes.func.isRequired,
  moveTabsIntoList: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  actionMode: PropTypes.oneOf(['add', 'move']),
  sourceList: PropTypes.object,
};

AddToListPanel.defaultProps = {
  actionMode: 'add',
  sourceList: null,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(AddToListPanel));
