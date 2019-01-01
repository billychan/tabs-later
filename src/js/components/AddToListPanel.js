import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Classes,
  Button,
} from '@blueprintjs/core';
import NewListPanel from './NewListPanel';

const AddToListPanel = ({ openPanel }) => (
  <div className="panel-content">
    <section className="main-section">
      content
    </section>
    <section className="actions">
      <Button
        text="New List"
        onClick={() => {
          openPanel({
            component: NewListPanel,
            title: 'New List',
          });
        }}
      />
      <Button text="Cancel" className={classNames(Classes.POPOVER_DISMISS, 'secondary-btn')} />
      <Button text="Done" intent="primary" />
    </section>
  </div>
);

AddToListPanel.propTypes = {
  openPanel: PropTypes.func.isRequired,
};

export default AddToListPanel;
