import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const SaveButton = ({ onClick, ...attrs }) => (
  <Button
    icon="floppy-disk"
    minimal
    onClick={onClick}
    title="Save"
    {...attrs}
  />
);

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SaveButton;
