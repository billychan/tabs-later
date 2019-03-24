import React from 'react';
import PropTypes from 'prop-types';
import EditListForm from 'components/formControls/EditListForm';

const CreateListPanel = ({ closePanel, onConfirm }) => (
  <div className="panel-content">
    <EditListForm
      onConfirm={({ listName }) => {
        closePanel();
        onConfirm({ listName });
      }}
      onCancel={() => closePanel()}
      primaryButtonText="Add"
      secondaryButtonText="Back"
    />
  </div>
);

CreateListPanel.propTypes = {
  closePanel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CreateListPanel;
