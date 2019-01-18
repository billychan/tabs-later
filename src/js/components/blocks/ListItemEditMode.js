import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import SaveButton from 'components/buttons/SaveButton';
import CancelButton from 'components/buttons/CancelButton';

const ListItemEditMode = ({ name, onSave, onCancel }) => {
  const [value, setValue] = useState(name);
  return (
    <li className="item-row item-row_edit-mode horizontal-center-aligned">
      <span className="item-row__text item-row__text_main">
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
      <SaveButton
        onClick={() => onSave(value)}
      />
      <CancelButton
        onClick={onCancel}
      />
    </li>
  );
};

ListItemEditMode.propTypes = {
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default cold(ListItemEditMode);
