import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cold } from 'react-hot-loader';
import {
  Classes,
  Button,
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import List from 'components/List';

import CreateListPanel from './CreateListPanel';

import * as listsActions from '../features/lists/listsActions';

const AddToListPanel = ({ openPanel, lists }) => (
  <div className="panel-content">
    <section className="main-section">
      <ul className="item-rows-ul">
        {
          lists.map(list => (
            <List
              {...list}
              key={list.id}
            />
          ))
        }
      </ul>
    </section>
    <section className="actions">
      <Button
        text="New List"
        onClick={() => {
          openPanel({
            component: CreateListPanel,
            title: 'New List',
          });
        }}
      />
      <Button text="Cancel" className={classNames(Classes.POPOVER_DISMISS, 'secondary-btn')} />
      <Button text="Done" intent="primary" />
    </section>
  </div>
);

AddToListPanel.propTypes = {
  openPanel: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(AddToListPanel));
