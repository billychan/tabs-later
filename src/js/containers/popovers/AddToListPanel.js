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
import CreateListPanel from 'containers/popovers/CreateListPanel';

import { ConfirmButton } from 'components/buttons/ButtonWithTooltip';

const AddToListPanel = ({
  openPanel, lists, addTabsIntoList, links,
}) => (
  <div className="panel-content">
    <section className="main-section scrollable">
      <ul className="ListItems">
        {
          lists.map((list) => {
            const uniqueLinksCount = getUniqueLinks(list, links).length;
            return (
              <ListItem {...list} key={list.id} mainCols={11} actionCols={1}>
                <ConfirmButton
                  disabled={!uniqueLinksCount}
                  intent={Intent.PRIMARY}
                  tooltip={uniqueLinksCount ? 'Add to list' : 'Already in list'}
                  onClick={() => {
                    addTabsIntoList(list, links).then(() => {
                      showSuccessMessage(
                        `${maybePluralize(uniqueLinksCount, 'tab', 'tabs')} saved to \
                        list "${list.name}"`,
                      );
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
};

const mapStateToProps = state => ({
  lists: getAllItems(state.lists),
});

export default connect(
  mapStateToProps,
  listsActions,
)(cold(AddToListPanel));
