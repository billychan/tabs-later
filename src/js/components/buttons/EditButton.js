import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const EditButton = ({ onClick }) => (
  <Button
    icon="edit"
    minimal
    onClick={onClick}
  />
);

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
