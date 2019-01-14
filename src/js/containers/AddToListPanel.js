import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cold } from 'react-hot-loader';
import {
  Classes,
  Button,
} from '@blueprintjs/core';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import { getCheckedTabs } from 'features/tabs/tabsSelectors';
import * as listsActions from 'features/lists/listsActions';

import List from 'components/List';
import CreateListPanel from './CreateListPanel';

const AddToListPanel = ({
  openPanel, lists, addLinksFromTabs, checkedTabs,
}) => {
  const [selectedLists, setSelectedLists] = useState([]);
  return (
    <div className="panel-content">
      <section className="main-section scrollable-section">
        <ul className="item-rows-ul">
          {
            lists.map(list => (
              <List
                {...list}
                key={list.id}
                selected={selectedLists.includes(list)}
                onChange={(id, selected) => {
                  const targetList = lists.find(item => item.id === id);
                  if (selected) {
                    setSelectedLists([...selectedLists, targetList]);
                  } else {
                    setSelectedLists(selectedLists.filter(item => item.id !== id));
                  }
                }}
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
        <Button
          text="Done"
          intent="primary"
          onClick={() => {
            addLinksFromTabs(selectedLists, checkedTabs);
          }}
        />
      </section>
    </div>
  );
};

AddToListPanel.propTypes = {
  openPanel: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedTabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  addLinksFromTabs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
  checkedTabs: getCheckedTabs(state.tabs),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(AddToListPanel));
