import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Intent } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import ButtonWithTooltip from 'components/buttons/ButtonWithTooltip';

const ButtonWithConfirmation = ({
  buttonIcon,
  alertIcon,
  intent,
  confirmButtonText,
  tooltip,
  onConfirm,
  text,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <>
      <ButtonWithTooltip
        onClick={() => setIsAlertOpen(true)}
        icon={buttonIcon}
        tooltip={tooltip}
      />
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText={confirmButtonText}
        icon={alertIcon}
        intent={intent}
        isOpen={isAlertOpen}
        style={{ width: '95%' }}
        onCancel={() => setIsAlertOpen(false)}
        onConfirm={onConfirm}
      >
        {text}
      </Alert>
    </>

  );
};

ButtonWithConfirmation.propTypes = {
  intent: PropTypes.string,
  buttonIcon: PropTypes.string,
  alertIcon: PropTypes.string,
  confirmButtonText: PropTypes.string,
  tooltip: PropTypes.string,
  text: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
};

ButtonWithConfirmation.defaultProps = {
  intent: Intent.DANGER,
  buttonIcon: null,
  alertIcon: null,
  confirmButtonText: 'Confirm',
  tooltip: null,
  text: 'Please confirm',
};

export default cold(ButtonWithConfirmation);

const _DeleteButtonWithConfirmation = ({
  confirmButtonText, tooltip, text, onConfirm,
}) => (
  ButtonWithConfirmation({
    confirmButtonText,
    intent: Intent.DANGER,
    tooltip,
    onConfirm,
    buttonIcon: 'trash',
    alertIcon: 'trash',
    text,
  })
);

export const DeleteButtonWithConfirmation = cold(_DeleteButtonWithConfirmation);
