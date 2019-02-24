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

const BulkAddToListButton = ({ enabled, numberOfTabsToAdd }) => (
  <Popover>
    <Button
      icon="add-to-artifact"
      minimal
      title="Add tabs to list"
    />
    <div className="add-to-list-box popover-content">
      { enabled
        ? (
          <PanelStack initialPanel={{
            component: AddToListPanel,
            title: `Add ${numberOfTabsToAdd} Tabs To List`,
          }}
          />
        )
        : <NoTabsCheckedWarning />
      }
    </div>
  </Popover>
);

BulkAddToListButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  numberOfTabsToAdd: PropTypes.number.isRequired,
};

export default BulkAddToListButton;
