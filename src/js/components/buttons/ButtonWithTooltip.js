import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';
import { Button, Tooltip } from '@blueprintjs/core';
import { noop } from 'common/helpers';

/**
 * @description Due to limitation on Blueprint, the Popover->Tooltip->Button relationship needs to
 * be defined directly so that when clicking the button the popver will show and tooltip will
 * dismiss, otherwise both of them appears and looks not so nice.
 * However there would be little abstration on that way. This ButtonWithTooltip component's purpose
 * is to abstract those common configuations, as well as making tooltip dismiss working by
 * intervening Tooltip's `isOpen` state via local variable.
 */
const ButtonWithTooltip = ({
  onClick, tooltip, icon, disabled, ...attrs
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Tooltip
      content={tooltip}
      hoverOpenDelay={0}
      hoverCloseDelay={0}
      disabled={disabled}
      usePortal={false}
      isOpen={isOpen}
      onInteraction={(nextState) => {
        setIsOpen(nextState);
      }}
      className="whitespace-no-wrap"
    >
      <Button
        icon={icon}
        minimal
        disabled={disabled}
        title={disabled ? tooltip : ''}
        onClick={() => {
          setIsOpen(false);
          onClick();
        }}
        {...attrs}
      />
    </Tooltip>
  );
};

ButtonWithTooltip.propTypes = {
  onClick: PropTypes.func,
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ButtonWithTooltip.defaultProps = {
  onClick: noop,
  disabled: false,
};

export default cold(ButtonWithTooltip);

export const DeleteButton = props => (
  <ButtonWithTooltip icon="trash" tooltip="Close" {...props} />);

export const ConfirmButton = props => (
  <ButtonWithTooltip icon="tick-circle" tooltip="yes" {...props} />);

export const CancelButton = props => (
  <ButtonWithTooltip icon="undo" tooltip="Cancel" {...props} />
);

export const SaveButton = props => (
  <ButtonWithTooltip icon="floppy-disk" tooltip="Save" {...props} />
);

export const RemoveDuplicationsButton = props => (
  <ButtonWithTooltip icon="property" tooltip="Remove duplications" {...props} />
);

export const EditButton = props => (
  <ButtonWithTooltip icon="edit" tooltip="Edit" {...props} />
);

export const OpenLinkButton = props => (
  <ButtonWithTooltip icon="document-open" tooltip="Open link" {...props} />
);

export const AddToListButton = props => (
  <ButtonWithTooltip icon="add-to-folder" tooltip="Add to list" {...props} />
);

export const AddButton = props => (
  <ButtonWithTooltip icon="plus" tooltip="Add item" {...props} />
);

export const ExportButton = props => (
  <ButtonWithTooltip icon="export" tooltip="Export" {...props} />
);

export const ImportButton = props => (
  <ButtonWithTooltip icon="import" tooltip="Import" {...props} />
);
