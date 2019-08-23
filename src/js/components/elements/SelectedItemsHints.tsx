import * as React from 'react';
import pluralize from 'pluralize';

interface SelectedItemsHintsProps {
  selectedCount: number,
  totalCount: number,
  itemName?: string,
}

const SelectedItemsHints = ({
  selectedCount,
  totalCount,
  itemName = 'item'
}: SelectedItemsHintsProps) => (
  <span>
    {
      !!selectedCount
        ? `${pluralize(itemName, totalCount, true)} | ${selectedCount} selected`
        : pluralize(itemName, totalCount, true)
    }
  </span>
);

export default SelectedItemsHints;
