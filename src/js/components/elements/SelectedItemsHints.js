import React from 'react';
import PropTypes from 'prop-types';

const SelectedItemsHints = ({ selectedCount, totalCount }) => (
  <span>
    <em>{selectedCount}</em>
    {' '}
    of
    {' '}
    <em>{totalCount}</em>
    {' '}
    items selected
  </span>
);

SelectedItemsHints.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default SelectedItemsHints;
