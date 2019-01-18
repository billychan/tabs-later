import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import ListItem from 'components/blocks/ListItem';
import ListItemEditMode from 'components/blocks/ListItemEditMode';
import EditButton from 'components/buttons/EditButton';

const ExtendedListItem = ({ name, links, onSave }) => {
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
    <ListItem name={name} links={links}>
      <EditButton onClick={() => { setEditMode(true); }} />
    </ListItem>
  );
};

ExtendedListItem.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default cold(ExtendedListItem);
