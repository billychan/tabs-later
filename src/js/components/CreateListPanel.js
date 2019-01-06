import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Button } from '@blueprintjs/core';

const CreateListPanel = ({ closePanel }) => (
  <div className="panel-content">
    <section className="main-section create-list-section">
      <input
        type="text"
        className={Classes.INPUT}
        placeholder="Enter List Name..."
        name="list-name"
      />
    </section>
    <section className="actions">
      <Button text="Back" onClick={closePanel} className="secondary-btn" />
      <Button text="Add" intent="primary" />
    </section>
  </div>
);

CreateListPanel.propTypes = {
  closePanel: PropTypes.func.isRequired,
};

export default CreateListPanel;
