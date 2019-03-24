import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Classes, Button } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { noop } from 'common/helpers';

/**
 * This could be reused on creating new list in panel, creating new list from adding
 * button(popover), edting list etc. The fields contains name but could have more when needed.
 */
const EditListForm = ({
  onConfirm,
  onCancel,
  primaryButtonText,
  secondaryButtonText,
}) => {
  const [listName, setListName] = useState('');
  return (
    <>
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
        <Button
          text={secondaryButtonText}
          onClick={onCancel}
          className={`secondary-btn ${Classes.POPOVER_DISMISS}`}
        />
        <Button
          text={primaryButtonText}
          className={Classes.POPOVER_DISMISS}
          intent="primary"
          onClick={() => {
            onConfirm({ listName });
          }}
        />
      </section>
    </>
  );
};

EditListForm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  primaryButtonText: PropTypes.string,
};

EditListForm.defaultProps = {
  onCancel: noop,
  secondaryButtonText: 'Cancel',
  primaryButtonText: 'Add',
};

export default cold(EditListForm);
