import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const AddToListButton = ({ onClick, enabled }) => (
  <Button
    icon={enabled ? 'plus' : 'small-tick'}
    minimal
    disabled={!enabled}
    onClick={onClick}
  />
);

AddToListButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default AddToListButton;
