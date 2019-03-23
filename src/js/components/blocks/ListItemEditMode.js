import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { CancelButton, SaveButton } from 'components/buttons/ButtonWithTooltip';

const ListItemEditMode = ({ name, onSave, onCancel }) => {
  const [value, setValue] = useState(name);
  return (
    <li className="ListItem">
      <span className="ListItem__main ListItem__main--edit col-10">
        <input
          type="text"
          className={Classes.INPUT}
          value={value}
          name="edit-name"
          onChange={({ target }) => {
            setValue(target.value);
          }}
        />
      </span>
      <div className="ListItem__actions col-2">
        <SaveButton
          onClick={() => onSave(value)}
        />
        <CancelButton
          onClick={onCancel}
        />
      </div>
    </li>
  );
};

ListItemEditMode.propTypes = {
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default cold(ListItemEditMode);
