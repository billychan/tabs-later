import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@blueprintjs/core';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';

const NoItemsWarningPopover = ({ warningText, children }) => (
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

NoItemsWarningPopover.propTypes = {
  warningText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

NoItemsWarningPopover.defaultProps = {
  warningText: 'Please select items to start',
};

export default NoItemsWarningPopover;
