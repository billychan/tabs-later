import * as React from 'react';
import classNames from 'classnames';
import { Button, Classes } from '@blueprintjs/core';

interface CancelPopoverButtonProps {
  className?: string
}

const CancelPopoverButton = ({ className }: CancelPopoverButtonProps) => (
  <Button text="Cancel" className={classNames(className, Classes.POPOVER_DISMISS)} />
);

export default CancelPopoverButton;
