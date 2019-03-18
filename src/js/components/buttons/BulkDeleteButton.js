import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
} from '@blueprintjs/core';

import { maybePluralize } from 'common/helpers';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import DeleteButton from 'components/buttons/DeleteButton';

const BulkDeleteButton = ({ links, onConfirm }) => {
  if (!links.length) {
    return (
      <NoItemsWarningPopover>
        <DeleteButton />
      </NoItemsWarningPopover>
    );
  }

  return (
    <Popover>
      <DeleteButton />
      <section className="popover-content popover-content-with-scrollable">
        <p>
          {`Going to close following ${maybePluralize(links.length, 'tab', 'tabs')}`}
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
            text="Close selected tabs"
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
};

export default BulkDeleteButton;
