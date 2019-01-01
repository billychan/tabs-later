import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';

const BulkCheck = ({ onChange, checkedStatus }) => {
  let indeterminate;
  let checked;

  switch (checkedStatus) {
    case 2:
      checked = true;
      indeterminate = false;
      break;
    case 1:
      checked = false;
      indeterminate = true;
      break;
    case 0:
    default:
      checked = false;
      indeterminate = false;
  }

  return (
    <Checkbox
      className="operation-select-all"
      onChange={({ target }) => onChange(target.checked)}
      checked={checked}
      indeterminate={indeterminate}
    />
  );
};

BulkCheck.propTypes = {
  onChange: PropTypes.func.isRequired,
  checkedStatus: PropTypes.oneOf([0, 1, 2]).isRequired,
};

export default BulkCheck;
