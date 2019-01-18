import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const SaveButton = ({ onClick }) => (
  <Button
    icon="floppy-disk"
    minimal
    onClick={onClick}
  />
);

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SaveButton;
