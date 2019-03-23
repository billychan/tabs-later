import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Classes, Button } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';

const CreateListPanel = ({ closePanel, onConfirm }) => {
  const [listName, setListName] = useState('');
  return (
    <div className="panel-content">
      <section className="main-section with-centered-children">
        <input
          type="text"
          className={Classes.INPUT}
          style={{ width: '96%' }}
          placeholder="Enter List Name..."
          name="list-name"
          onChange={event => setListName(event.target.value)}
        />
      </section>
      <section className="actions">
        <Button text="Back" onClick={closePanel} className="secondary-btn" />
        <Button
          text="Add"
          intent="primary"
          onClick={() => {
            closePanel();
            onConfirm({ listName });
          }}
        />
      </section>
    </div>
  );
};

CreateListPanel.propTypes = {
  // closePanel is from Blueprint Panel
  closePanel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default cold(CreateListPanel);
