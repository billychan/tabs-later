import * as React from 'react';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';

import { AppState } from 'rootReducer';

import * as listsActions from 'features/lists/listsActions';

import { getAllItems } from 'common/selectors';

import { showSuccessMessage } from 'components/uiHelpers';
import Footer from 'components/blocks/Footer';
import ExtendedListItem from 'components/blocks/ExtendedListItem';

import ListDetailsPage from 'containers/pages/ListDetailsPage';
import CreateListButton from 'components/buttons/CreateListButton';

interface ListsPageProps {
  lists: TabsLater.List[];
  updateListAttrs: TabsLater.ThenableActionCreator;
  deleteList: TabsLater.ThenableActionCreator;
  createList: TabsLater.ThenableActionCreator;
  openPanel: TabsLater.EventHandler;
}

const ListsPage = ({
  lists, updateListAttrs, deleteList, createList, openPanel,
}: ListsPageProps) => (
  <section className="relative">
    <section className="absolute right-0 top-0 -mt-8 mr-2 z-10">
      <CreateListButton
        onConfirm={({ listName }) => {
          createList({ listName })
            .then(() => showSuccessMessage(`New list "${listName}" created`));
        }}
      />
    </section>
    <ul className="ListsPage_lists ListItems scrollable py-2 m-0 -ml-1">
      {
        lists.map(list => (
          <ExtendedListItem
            {...list}
            key={list.id}
            onSave={(name) => {
              updateListAttrs(list, { name })
                .then(() => showSuccessMessage(`List "${name}" updated`));
            }}
            onDeletion={() => {
              deleteList(list)
                .then(() => showSuccessMessage(`List "${list.name}" deleted`));
            }}
            onClick={() => {
              openPanel({
                component: ListDetailsPage,
                title: list.name,
                props: { list: list },
              });
            }}
          />
        ))
      }
    </ul>
    <Footer>
      <span>{`${lists.length} lists`}</span>
    </Footer>
  </section>
);

const mapStateToProps = (state: AppState) => ({
  lists: getAllItems(state.lists),
  tabs: getAllItems(state.tabs),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(ListsPage));
