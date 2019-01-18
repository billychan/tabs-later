import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';
import {
  Classes,
  Button,
} from '@blueprintjs/core';

import { connect } from 'react-redux';
import { getAllItems } from 'common/selectors';
import { getCheckedTabs } from 'features/tabs/tabsSelectors';
import * as listsActions from 'features/lists/listsActions';
import { hasAllLinks } from 'features/lists/listsEntityUtils';

import ListItem from 'components/blocks/ListItem';
import AddToListButton from 'components/buttons/AddToListButton';
import CreateListPanel from 'containers/panels/CreateListPanel';

const AddToListPanel = ({
  openPanel, lists, addLinksFromTabs, checkedTabs,
}) => (
  <div className="panel-content">
    <section className="main-section scrollable-section">
      <ul className="item-rows-ul">
        {
          lists.map(list => (
            <ListItem {...list} key={list.id}>
              <AddToListButton
                enabled={!hasAllLinks(list, checkedTabs)}
                onClick={() => {
                  addLinksFromTabs([list], checkedTabs);
                }}
              />
            </ListItem>
          ))
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
          });
        }}
      />
      <Button text="Done" className={Classes.POPOVER_DISMISS} />
    </section>
  </div>
);

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
