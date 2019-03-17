import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
} from '@blueprintjs/core';
import { filterDuplications, maybePluralize } from 'common/helpers';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';

const BulkCloseDuplicationsButton = ({ links, onConfirm }) => {
  const duplicatedLinks = filterDuplications(links, 'url');
  const dupSize = duplicatedLinks.length;

  return (
    <Popover>
      <Button
        icon="property"
        minimal
        title="Close duplicated tabs"
      />
      <section className="popover-content BulkCloseDuplications">
        {
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
            ) : (
              <p>There is no duplications. All set!</p>
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
