import React from 'react';
import PropTypes from 'prop-types';
import {
  PanelStack,
  Popover,
} from '@blueprintjs/core';

import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import AddToListPanel from 'containers/popovers/AddToListPanel';
import { AddToListButton as ActionButton } from 'components/buttons/ButtonWithTooltip';

const AddToListButton = () => (
  <ActionButton tooltip="Add selected tabs to list" />
);

const BulkAddToListButton = ({ links }) => (
  links.length
    ? (
      <Popover>
        <AddToListButton />
        <section className="add-to-list-box popover-content">
          <PanelStack initialPanel={{
            component: AddToListPanel,
            title: `Add ${links.length} Tabs To List`,
            props: { links },
          }}
          />
        </section>
      </Popover>
    ) : (
      <NoItemsWarningPopover warningText="Pleas selecte items to add to list.">
        <AddToListButton />
      </NoItemsWarningPopover>
    )
);

BulkAddToListButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BulkAddToListButton;
