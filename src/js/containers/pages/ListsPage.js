import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';

import * as listsActions from 'features/lists/listsActions';

import { getAllItems } from 'common/selectors';

import { showSuccessMessage } from 'components/uiHelpers';
import Footer from 'components/blocks/Footer';
import ExtendedListItem from 'components/blocks/ExtendedListItem';

import ListDetailsPage from 'containers/pages/ListDetailsPage';
import CreateListButton from 'components/buttons/CreateListButton';

const ListsPage = ({
  lists, updateListAttrs, deleteList, createList, openPanel,
}) => (
  <section className="ListsPage">
    <section className="ListPage_actions">
      <CreateListButton
        onConfirm={({ listName }) => {
          createList({ listName })
            .then(() => showSuccessMessage(`New list "${listName}" created`));
        }}
      />
    </section>
    <ul className="ListsPage_lists ListItems">
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
                props: { listId: list.id },
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
  updateListAttrs: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
  tabs: getAllItems(state.tabs),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(ListsPage));
