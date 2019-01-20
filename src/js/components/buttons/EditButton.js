import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const EditButton = ({ onClick, ...attrs }) => (
  <Button
    icon="edit"
    minimal
    onClick={onClick}
    {...attrs}
  />
);

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
