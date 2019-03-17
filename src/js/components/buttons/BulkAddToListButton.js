import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  PanelStack,
  Popover,
} from '@blueprintjs/core';

import AddToListPanel from 'containers/popovers/AddToListPanel';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';

const AddTabsButton = () => <Button icon="add-to-artifact" minimal title="Add tabs to list" />;

const BulkAddToListButton = ({ links }) => (
  links.length
    ? (
      <Popover>
        <AddTabsButton />
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
      <NoItemsWarningPopover>
        <AddTabsButton />
      </NoItemsWarningPopover>
    )
);

BulkAddToListButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BulkAddToListButton;
