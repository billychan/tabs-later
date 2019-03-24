import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
} from '@blueprintjs/core';

import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import { DeleteButton } from 'components/buttons/ButtonWithTooltip';

const BulkDeleteButton = ({
  links, onConfirm, buttonText, noItemsWarning, itemsWarning,
}) => {
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
      <section className="popover-content popover-content-with-scrollable">
        <p>
          {itemsWarning}
        </p>
        <ul>
          {
            links.map(link => (
              <li title={link.url} key={link.id}>{link.url}</li>
            ))
          }
        </ul>
        <section className="actions">
          <Button
            text={buttonText}
            intent="primary"
            onClick={() => { onConfirm(links); }}
          />
          <CancelPopoverButton />
        </section>
      </section>
    </Popover>
  );
};

BulkDeleteButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirm: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  noItemsWarning: PropTypes.string,
  itemsWarning: PropTypes.string,
};

BulkDeleteButton.defaultProps = {
  noItemsWarning: 'Please select items',
  itemsWarning: 'Going to delete following',
};

export default BulkDeleteButton;
