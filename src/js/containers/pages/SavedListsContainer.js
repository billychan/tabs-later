import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import * as listsActions from 'features/lists/listsActions';

import { showSuccessMessage } from 'components/uiHelpers';
import ExtendedListItem from 'components/blocks/ExtendedListItem';

const SavedListsContainer = ({ lists, updateList, deleteList }) => (
  <section className="main-section scrollable-section">
    <ul className="item-rows-ul">
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
          />
        ))
      }
    </ul>
  </section>
);

SavedListsContainer.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(SavedListsContainer));
