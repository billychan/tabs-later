import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { noop } from 'common/helpers';

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
  onClick: PropTypes.func,
};

DeleteButton.defaultProps = {
  onClick: noop,
};

export default DeleteButton;
