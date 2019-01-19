import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { Alert, Intent } from '@blueprintjs/core';

import ListItem from 'components/blocks/ListItem';
import ListItemEditMode from 'components/blocks/ListItemEditMode';
import EditButton from 'components/buttons/EditButton';
import DeleteButton from 'components/buttons/DeleteButton';

const ExtendedListItem = ({
  name, links, onSave, onDeletion,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [isDeletionAlertOpen, setIsDeletionAlertOpen] = useState(false);

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
    <ListItem name={name} links={links}>
      <EditButton onClick={() => { setEditMode(true); }} />
      <DeleteButton onClick={() => setIsDeletionAlertOpen(true)} />
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={isDeletionAlertOpen}
        style={{ width: '95%' }}
        onCancel={() => setIsDeletionAlertOpen(false)}
        onConfirm={onDeletion}
      >
        <p>
          Are you sure to delete the list
          <em>{` ${name}`}</em>
          ?
        </p>
      </Alert>
    </ListItem>
  );
};

ExtendedListItem.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDeletion: PropTypes.func.isRequired,
};

export default cold(ExtendedListItem);
