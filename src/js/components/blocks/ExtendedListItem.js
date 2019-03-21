import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import ListItem from 'components/blocks/ListItem';
import ListItemEditMode from 'components/blocks/ListItemEditMode';
import { EditButton } from 'components/buttons/ButtonWithTooltip';
import { DeleteButtonWithConfirmation } from 'components/buttons/ButtonWithConfirmation';

const ExtendedListItem = ({
  name, links, onSave, onDeletion, onClick,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return (
      <ListItemEditMode
        name={name}
        onSave={(newName) => {
          setEditMode(false);
          onSave(newName);
        }}
        onCancel={() => {
          setEditMode(false);
        }}
      />
    );
  }
  return (
    <ListItem
      name={name}
      links={links}
      mainCols={12}
      actionsVisibleOnHover
      onClick={onClick}
    >
      <DeleteButtonWithConfirmation
        tooltip="Delete list"
        confirmButtonText="Delete"
        text={`Are you sure to delete the list "${name}"?`}
        onConfirm={onDeletion}
      />
      <EditButton onClick={() => { setEditMode(true); }} />
    </ListItem>
  );
};

ExtendedListItem.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDeletion: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default cold(ExtendedListItem);
