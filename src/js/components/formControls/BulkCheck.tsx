import * as React from 'react';
import { Checkbox } from '@blueprintjs/core';

interface BulkCheckProps {
  onChange: TabsLater.EventHandler,
  checkedStatus: 0 | 1 | 2
}

const BulkCheck = ({ onChange, checkedStatus }: BulkCheckProps) => {
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
      className="mb-0"
      onChange={({ currentTarget }) => onChange(currentTarget.checked)}
      checked={checked}
      indeterminate={indeterminate}
    />
  );
};

export default BulkCheck;
