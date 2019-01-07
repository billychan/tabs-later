import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Classes, Button } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';

import { connect } from 'react-redux';
import * as listsActions from '../features/lists/listsActions';

const CreateListPanel = ({ closePanel, createList }) => {
  const [listName, setListName] = useState('');
  return (
    <div className="panel-content">
      <section className="main-section create-list-section">
        <input
          type="text"
          className={Classes.INPUT}
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
            createList({ name: listName });
            closePanel();
          }}
        />
      </section>
    </div>
  );
};

CreateListPanel.propTypes = {
  closePanel: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.lists;

export default connect(
  mapStateToProps,
  listsActions,
)(cold(CreateListPanel));
