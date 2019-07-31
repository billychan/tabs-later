import * as React from 'react';
import { Popover } from '@blueprintjs/core';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';

interface NoItemsWarningPopoverProps {
  warningText?: string,
  children?: React.ReactChild
}

const NoItemsWarningPopover = ({
  warningText = "Please select items to start",
  children
}: NoItemsWarningPopoverProps) => (
  <Popover>
    {children}
    <section className="p-5 w-80">
      <section className="flex items-center justify-center">
        <p>{warningText}</p>
      </section>
      <section className="actions justify-end">
        <CancelPopoverButton />
      </section>
    </section>
  </Popover>
);

export default NoItemsWarningPopover;
