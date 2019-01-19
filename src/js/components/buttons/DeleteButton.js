import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const DeleteButton = ({ onClick }) => (
  <Button
    icon="trash"
    minimal
    onClick={onClick}
  />
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
