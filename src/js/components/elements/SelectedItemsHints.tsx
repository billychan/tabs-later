import * as React from 'react';
import pluralize from 'pluralize';

interface SelectedItemsHintsProps {
  selectedCount: number,
  totalCount: number
}

const SelectedItemsHints = ({ selectedCount, totalCount }: SelectedItemsHintsProps) => (
  <span>
    {selectedCount}
    {' '}
    of
    {' '}
    {pluralize('item', totalCount, true)}
    {' '}
    selected
  </span>
);

export default SelectedItemsHints;
