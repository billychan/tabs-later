import React from 'react';
import PropTypes from 'prop-types';
import { maybePluralize } from 'common/helpers';

const SelectedItemsHints = ({ selectedCount, totalCount }) => (
  <span>
    <em>{selectedCount}</em>
    {' '}
    of
    {' '}
    {maybePluralize(totalCount, 'item', 'items')}
    {' '}
    selected
  </span>
);

SelectedItemsHints.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default SelectedItemsHints;
