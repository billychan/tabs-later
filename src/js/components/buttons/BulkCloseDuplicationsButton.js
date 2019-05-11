import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
} from '@blueprintjs/core';

import { filterDuplications, maybePluralize } from 'common/helpers';

import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import { RemoveDuplicationsButton as ActionButton } from 'components/buttons/ButtonWithTooltip';

const RemoveDuplicationsButton = () => (
  <ActionButton tooltip="Close duplications" />
);

const NoDuplicationMessage = () => (
  <p>There is no duplications. All set!</p>
);

const BulkCloseDuplicationsButton = ({ links, onConfirm }) => {
  const duplicatedLinks = filterDuplications(links, 'url');
  const dupSize = duplicatedLinks.length;

  if (!links.length) {
    return (
      <NoItemsWarningPopover warningText="Please select items to close duplicated ones among them.">
        <RemoveDuplicationsButton />
      </NoItemsWarningPopover>
    );
  }

  return (
    <Popover>
      <RemoveDuplicationsButton />
      <section className="p-5">
        {(
          dupSize
            ? (
              <section className="w-75">
                <p>
                  {`There are ${maybePluralize(dupSize, 'duplicated tab', 'duplicated tabs')}`}
                </p>
                <ul className="scrollable py-2 max-h-20">
                  {
                    duplicatedLinks.map(link => (
                      <li
                        title={link.url}
                        key={link.id}
                        className="truncate text-xs mb-2 text-gray-600"
                      >
                        {link.url}
                      </li>
                    ))
                  }
                </ul>
                <section className="actions">
                  <Button
                    text="Close Duplicated Tabs"
                    intent="primary"
                    onClick={() => { onConfirm(duplicatedLinks); }}
                  />
                  <CancelPopoverButton />
                </section>
              </section>
            ) : (
              <section className="w-75">
                <section><NoDuplicationMessage /></section>
                <section className="actions justify-end">
                  <CancelPopoverButton />
                </section>
              </section>
            )
          )
        }
      </section>
    </Popover>
  );
};

BulkCloseDuplicationsButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default BulkCloseDuplicationsButton;
