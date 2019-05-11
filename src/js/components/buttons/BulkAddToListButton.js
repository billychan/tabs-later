import React from 'react';
import PropTypes from 'prop-types';
import {
  PanelStack,
  Popover,
} from '@blueprintjs/core';
import capitalize from 'lodash/capitalize';
import { maybePluralize } from 'common/helpers';

import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import AddToListPanel from 'containers/popovers/AddToListPanel';
import { AddToListButton } from 'components/buttons/ButtonWithTooltip';

const getTooltip = actionMode => (actionMode === 'add' ? 'Add to list' : 'Move to another list');

const BulkAddToListButton = ({
  links,
  actionMode,
  targetName,
  sourceList,
}) => (
  links.length
    ? (
      <Popover>
        <AddToListButton tooltip={getTooltip(actionMode)} />
        <section className="p-5">
          <PanelStack
            className="h-75 w-75"
            initialPanel={{
              component: AddToListPanel,
              title: `${capitalize(actionMode)} \
                ${maybePluralize(links.length, capitalize(targetName))} To List`,
              props: {
                links,
                actionMode,
                sourceList,
              },
            }}
          />
        </section>
      </Popover>
    ) : (
      <NoItemsWarningPopover warningText={`Pleas select ${targetName}s to ${actionMode} to list.`}>
        <AddToListButton tooltip={getTooltip(actionMode)} />
      </NoItemsWarningPopover>
    )
);

BulkAddToListButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  actionMode: PropTypes.oneOf(['add', 'move']),
  targetName: PropTypes.oneOf(['tab', 'link']),
  sourceList: PropTypes.object,
};

BulkAddToListButton.defaultProps = {
  actionMode: 'add',
  targetName: 'tab',
  sourceList: null,
};

export default BulkAddToListButton;
