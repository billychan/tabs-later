import * as React from 'react';
import { Alert, Intent, IconName } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import ButtonWithTooltip from 'components/buttons/ButtonWithTooltip';

const { useState } = React;

interface ButtonWithConfirmationProps {
  buttonIcon: IconName;
  confirmButtonText?: string;
  tooltip: string;
  text?: React.ReactNode;
  onConfirm: TabsLater.EventHandler;
}

const ButtonWithConfirmation = ({
  buttonIcon,
  confirmButtonText = 'Confirm',
  tooltip,
  onConfirm,
  text = 'Please confirm',
}:ButtonWithConfirmationProps) => {
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
        icon="trash"
        intent={Intent.DANGER}
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

export default cold(ButtonWithConfirmation);

interface DeleteButtonWithConfirmationProps {
  confirmButtonText: string,
  tooltip: string,
  text: React.ReactNode,
  onConfirm: TabsLater.EventHandler
}

const _DeleteButtonWithConfirmation = ({
  confirmButtonText,
  tooltip,
  text,
  onConfirm
}: DeleteButtonWithConfirmationProps) =>
  ButtonWithConfirmation({
    confirmButtonText,
    tooltip,
    onConfirm,
    buttonIcon: "trash",
    text
  });

export const DeleteButtonWithConfirmation = cold(_DeleteButtonWithConfirmation);
