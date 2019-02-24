import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const DeleteButton = ({ onClick, ...attrs }) => (
  <Button
    icon="trash"
    minimal
    onClick={onClick}
    title="Delete"
    {...attrs}
  />
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
