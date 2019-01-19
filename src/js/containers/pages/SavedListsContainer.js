import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import * as listsActions from 'features/lists/listsActions';

import ExtendedListItem from 'components/blocks/ExtendedListItem';

const SavedListsContainer = ({ lists, updateList, deleteList }) => (
  <section className="main-section scrollable-section">
    <ul className="item-rows-ul">
      {
        lists.map(list => (
          <ExtendedListItem
            {...list}
            key={list.id}
            onSave={name => updateList(list, { name })}
            onDeletion={() => deleteList(list)}
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
