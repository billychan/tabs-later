import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  PanelStack,
  Popover,
} from '@blueprintjs/core';
import AddToListPanel from '../containers/AddToListPanel';

const NoTabsCheckedWarning = () => (
  <section className="with-centered-children">
    <p>Please select tabs to add</p>
  </section>
);

const BulkAddToList = ({ enabled }) => (
  <Popover>
    <Button
      icon="add-to-artifact"
      minimal
    />
    <div className="add-to-list-box">
      { enabled
        ? (<PanelStack initialPanel={{ component: AddToListPanel, title: 'Add To List' }} />)
        : <NoTabsCheckedWarning />
      }
    </div>
  </Popover>
);

BulkAddToList.propTypes = {
  enabled: PropTypes.bool.isRequired,
};

export default BulkAddToList;
