import React from 'react';
import PropTypes from 'prop-types';
import EditListForm from 'components/formControls/EditListForm';

import { Popover } from '@blueprintjs/core';

import { AddButton } from 'components/buttons/ButtonWithTooltip';

const CreateListButton = ({ onConfirm }) => (
  <Popover>
    <AddButton tooltip="Create New List" />
    <section className="p-5 w-80">
      <EditListForm
        onConfirm={({ listName }) => {
          onConfirm({ listName });
        }}
        primaryButtonText="Create List"
        secondaryButtonText="Cancel"
      />
    </section>
  </Popover>
);

CreateListButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default CreateListButton;
