import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@blueprintjs/core';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';

const NoItemsWarningPopover = ({ warningText, children }) => (
  <Popover>
    {children}
    <section className="popover-content">
      <section className="with-centered-children">
        <p>{warningText}</p>
      </section>
      <section className="actions actions--single">
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
