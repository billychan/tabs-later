import * as React from 'react';
import { cold } from 'react-hot-loader';
import { Button, Intent } from '@blueprintjs/core';

import { AppState } from 'rootReducer';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import pluralize from 'pluralize';

import * as listsActions from 'features/lists/listsActions';
import { getUniqueLinks } from 'features/lists/entity/utils';

import { showSuccessMessage } from 'components/uiHelpers';

import ListItem from 'components/blocks/ListItem';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import CreateListPanel from 'components/popovers/CreateListPanel';
import { ConfirmButton } from 'components/buttons/ButtonWithTooltip';

interface SavedMessageParams {
  listName: string;
  links: TabsLater.Link[];
  actionMode: TabsLater.AddOrMoveAction;
}

interface AddToListPanelProps {
  openPanel: TabsLater.EventHandler;
  lists: TabsLater.List[];
  links: TabsLater.Link[];
  sourceList?: TabsLater.List;
  actionMode: TabsLater.AddOrMoveAction;
  addTabsIntoList: TabsLater.ThenableActionCreator;
  moveTabsIntoList: TabsLater.ThenableActionCreator;
  createList: TabsLater.ThenableActionCreator;
}

const savedMessage = ({ listName, links, actionMode }: SavedMessageParams) => {
  const verb = actionMode === 'add' ? 'saved' : 'moved';
  return `${pluralize('link', links.length, true)} ${verb} into list "${listName}"`;
};

const AddToListPanel = ({
  openPanel,
  lists,
  links,
  sourceList,
  actionMode = 'add',
  addTabsIntoList,
  moveTabsIntoList,
  createList,
}: AddToListPanelProps) => (
  <div className="panel-content">
    <section className="w-60 scrollable">
      <ul className="scrollable py-2 px-1 m-0 -ml-1">
        {
          lists.map((list: TabsLater.List) => {
            const uniqueLinksCount = getUniqueLinks(list, links).length;
            const tooltip = actionMode === 'add' ? 'Add to list' : 'Move to another list';
            return (
              <ListItem {...list} key={list.id} mainCols={11}>
                <>
                  <ConfirmButton
                    disabled={!uniqueLinksCount}
                    intent={Intent.PRIMARY}
                    tooltip={uniqueLinksCount ? tooltip : 'Already in list'}
                    onClick={() => {
                      const promise = (actionMode === 'move' && sourceList)
                        ? moveTabsIntoList(sourceList, links, list)
                        : addTabsIntoList(list, links);
                      promise.then(() => {
                        showSuccessMessage(
                          savedMessage({
                            listName: list.name,
                            links,
                            actionMode
                          })
                        )
                      })
                    }}
                  />
                </>
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
              onConfirm({ listName }: { listName: string}) {
                createList({ listName })
                  .then((newList: TabsLater.List) => {
                    showSuccessMessage(`New list "${listName}" created`);
                    return newList;
                  })
                  .then((newList: TabsLater.List) => (
                    (actionMode === 'move' && sourceList)
                      ? moveTabsIntoList(sourceList, links, newList)
                      : addTabsIntoList(newList, links)
                  ))
                  .then(() => {
                    showSuccessMessage(savedMessage({ listName, links, actionMode }));
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

const mapStateToProps = (state: AppState) => ({
  lists: getAllItems(state.lists),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(AddToListPanel));
