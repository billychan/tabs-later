import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
} from '@blueprintjs/core';

import { filterDuplications, maybePluralize } from 'common/helpers';

import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';

const CloseButton = () => (
  <Button icon="property" minimal title="Close duplicated tabs" />
);

const NoDuplicationMessage = () => (
  <p>There is no duplications. All set!</p>
);

const BulkCloseDuplicationsButton = ({ links, onConfirm }) => {
  const duplicatedLinks = filterDuplications(links, 'url');
  const dupSize = duplicatedLinks.length;

  if (!links.length) {
    return (
      <NoItemsWarningPopover>
        <CloseButton />
      </NoItemsWarningPopover>
    );
  }

  return (
    <Popover>
      <CloseButton />
      <section className="popover-content popover-content-with-scrollable">
        {(
          dupSize
            ? (
              <>
                <p>
                  {`There are ${maybePluralize(dupSize, 'duplicated tab', 'duplicated tabs')}`}
                </p>
                <ul>
                  {
                    duplicatedLinks.map(link => (
                      <li title={link.url} key={link.id}>{link.url}</li>
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
              </>
            ) : <NoDuplicationMessage />
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
