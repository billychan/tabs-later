import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  PanelStack,
  Popover,
} from '@blueprintjs/core';
import AddToListPanel from 'containers/popovers/AddToListPanel';

const NoTabsCheckedWarning = () => (
  <section className="with-centered-children">
    <p>Please select tabs to add</p>
  </section>
);

const BulkAddToListButton = ({ links }) => (
  <Popover>
    <Button
      icon="add-to-artifact"
      minimal
      title="Add tabs to list"
    />
    <section className="add-to-list-box popover-content">
      { links.length
        ? (
          <PanelStack initialPanel={{
            component: AddToListPanel,
            title: `Add ${links.length} Tabs To List`,
            props: { links },
          }}
          />
        )
        : <NoTabsCheckedWarning />
      }
    </section>
  </Popover>
);

BulkAddToListButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BulkAddToListButton;
