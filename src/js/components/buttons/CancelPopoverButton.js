import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Classes } from '@blueprintjs/core';

const CancelPopoverButton = ({ className }) => (
  <Button text="Cancel" className={classNames(className, Classes.POPOVER_DISMISS)} />
);

CancelPopoverButton.propTypes = {
  className: PropTypes.string,
};

CancelPopoverButton.defaultProps = {
  className: '',
};


export default CancelPopoverButton;
