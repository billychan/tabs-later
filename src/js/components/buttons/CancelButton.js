import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const CancelButton = ({ onClick }) => (
  <Button
    icon="undo"
    minimal
    onClick={onClick}
    title="Cancel"
  />
);

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CancelButton;
