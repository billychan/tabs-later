import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { CancelButton, SaveButton } from 'components/buttons/ButtonWithTooltip';

const ListItemEditMode = ({ name, onSave, onCancel }) => {
  const [value, setValue] = useState(name);
  return (
    <li className="relative">
      <span className="block w-10/12">
        <input
          type="text"
          className={classNames(Classes.INPUT, 'w-full')}
          value={value}
          name="edit-name"
          onChange={({ target }) => {
            setValue(target.value);
          }}
        />
      </span>
      <div className="children:float-right right-0 absolute-vertical-center w-2/12">
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
