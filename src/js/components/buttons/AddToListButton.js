import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const AddToListButton = ({ onClick, enabled }) => (
  <Button
    icon={enabled ? 'tick-circle' : 'small-tick'}
    minimal
    disabled={!enabled}
    onClick={onClick}
    title={enabled ? 'Add to this list' : 'Already in the list'}
  />
);

AddToListButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default AddToListButton;
