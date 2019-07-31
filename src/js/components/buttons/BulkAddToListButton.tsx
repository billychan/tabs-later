import * as React from 'react';
import {
  PanelStack,
  Popover,
} from '@blueprintjs/core';
import { capitalize } from 'lodash';
import pluralize from "pluralize";

import NoItemsWarningPopover from 'components/popovers/NoItemsWarningPopover';
import AddToListPanel from 'containers/popovers/AddToListPanel';
import { AddToListButton } from 'components/buttons/ButtonWithTooltip';

const getTooltip = (actionMode: TabsLater.AddOrMoveAction) => (
  actionMode === 'add' ? 'Add to list' : 'Move to another list'
);

interface BulkAddToListButtonProps {
  links: TabsLater.Link[];
  actionMode?: TabsLater.AddOrMoveAction;
  targetName?: 'tab' | 'link';
  sourceList?: TabsLater.List;
}

const BulkAddToListButton = ({
  links,
  actionMode = 'add',
  targetName = 'tab',
  sourceList,
}: BulkAddToListButtonProps) => (
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
                ${pluralize(capitalize(targetName), links.length, true)} To List`,
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

export default BulkAddToListButton;
