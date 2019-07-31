import * as React from 'react';
import {
  Button,
  Popover,
} from '@blueprintjs/core';

import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/popovers/NoItemsWarningPopover';
import { DeleteButton } from 'components/buttons/ButtonWithTooltip';

interface BulkDeleteButtonProps {
  links: TabsLater.Link[],
  onConfirm: TabsLater.EventHandler,
  buttonText: string,
  noItemsWarning?: string,
  itemsWarning?: string,
}

const BulkDeleteButton = ({
  links,
  onConfirm,
  buttonText,
  noItemsWarning = 'Please select items',
  itemsWarning = 'Going to delete following',
}: BulkDeleteButtonProps) => {
  if (!links.length) {
    return (
      <NoItemsWarningPopover warningText={noItemsWarning}>
        <DeleteButton tooltip={buttonText} />
      </NoItemsWarningPopover>
    );
  }

  return (
    <Popover>
      <DeleteButton tooltip={buttonText} />
      <section className="p-5 w-80">
        <p>{itemsWarning}</p>
        <ul className="scrollable py-2 max-h-20">
          {links.map(link => (
            <li
              title={link.url}
              key={link.id}
              className="truncate text-xs mb-2 text-gray-600"
            >
              {link.url}
            </li>
          ))}
        </ul>
        <section className="actions">
          <Button
            text={buttonText}
            intent="primary"
            onClick={() => {
              onConfirm(links);
            }}
          />
          <CancelPopoverButton />
        </section>
      </section>
    </Popover>
  );
};

export default BulkDeleteButton;
