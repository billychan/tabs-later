import * as React from 'react';
import { cold } from 'react-hot-loader';
import { Button, Tooltip, IconName, Intent } from '@blueprintjs/core';

const { useState } = React;

interface ButtonWithTooltipProps {
  onClick?: TabsLater.EventHandler;
  tooltip?: string;
  icon?: IconName;
  disabled?: boolean;
  intent?: Intent;
}

/**
 * @description Due to limitation on Blueprint, the Popover->Tooltip->Button relationship needs to
 * be defined directly so that when clicking the button the popover will show and tooltip will
 * dismiss, otherwise both of them appears and looks not so nice.
 * However there would be little abstraction on that way. This ButtonWithTooltip component's purpose
 * is to abstract those common configurations, as well as making tooltip dismiss working by
 * intervening Tooltip's `isOpen` state via local variable.
 */
const ButtonWithTooltip = ({
  onClick,
  tooltip,
  icon,
  disabled = false,
  ...props
}: ButtonWithTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Tooltip
      content={tooltip}
      hoverOpenDelay={0}
      hoverCloseDelay={0}
      disabled={disabled}
      usePortal={false}
      isOpen={isOpen}
      onInteraction={nextState => {
        setIsOpen(nextState);
      }}
      className="whitespace-no-wrap"
    >
      <Button
        icon={icon}
        minimal
        disabled={disabled}
        title={disabled ? tooltip : ""}
        onClick={() => {
          setIsOpen(false);
          if (onClick) {
            onClick();
          }
        }}
        {...props}
      />
    </Tooltip>
  );
};

export default cold(ButtonWithTooltip);

export const DeleteButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="trash" tooltip="Close" {...props} />);

export const CopyButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="duplicate" tooltip="Copy" {...props} />);

export const ConfirmButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="tick-circle" tooltip="yes" {...props} />);

export const CancelButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="undo" tooltip="Cancel" {...props} />
);

export const SaveButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="floppy-disk" tooltip="Save" {...props} />
);

export const RemoveDuplicationsButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="property" tooltip="Remove duplications" {...props} />
);

export const EditButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="edit" tooltip="Edit" {...props} />
);

export const OpenLinkButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="document-open" tooltip="Open link" {...props} />
);

export const AddToListButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="add-to-folder" tooltip="Add to list" {...props} />
);

export const AddButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="plus" tooltip="Add item" {...props} />
);

export const ExportButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="export" tooltip="Export" {...props} />
);

export const ImportButton = (props: ButtonWithTooltipProps) => (
  <ButtonWithTooltip icon="import" tooltip="Import" {...props} />
);
