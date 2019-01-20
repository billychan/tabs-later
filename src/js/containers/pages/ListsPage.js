import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import * as listsActions from 'features/lists/listsActions';

import { showSuccessMessage } from 'components/uiHelpers';
import ExtendedListItem from 'components/blocks/ExtendedListItem';
import ListDetailsPage from 'components/pages/ListDetailsPage';

const ListsPage = ({
  lists, updateList, deleteList, openPanel,
}) => (
  <section className="main-section">
    <ul className="ListItems">
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
                  links: Object.values(list.links),
                },
              });
            }}
          />
        ))
      }
    </ul>
  </section>
);

ListsPage.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(ListsPage));
