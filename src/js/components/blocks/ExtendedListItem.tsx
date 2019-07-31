import * as React from 'react';
import { cold } from 'react-hot-loader';

import ListItem from 'components/blocks/ListItem';
import ListItemEditMode from 'components/blocks/ListItemEditMode';
import { EditButton } from 'components/buttons/ButtonWithTooltip';
import { DeleteButtonWithConfirmation } from 'components/buttons/ButtonWithConfirmation';

interface ExtendedListItemProps {
  name: string,
  links: TabsLater.LinksObj,
  onSave: (name: string) => void,
  onDeletion: TabsLater.EventHandler,
  onClick: TabsLater.EventHandler,
}

const ExtendedListItem = ({
  name, links, onSave, onDeletion, onClick,
}: ExtendedListItemProps) => {
  const [editMode, setEditMode] = React.useState(false);

  if (editMode) {
    return (
      <ListItemEditMode
        name={name}
        onSave={(newName: string) => {
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
      <>
        <DeleteButtonWithConfirmation
          tooltip="Delete list"
          confirmButtonText="Delete"
          text={`Are you sure to delete the list "${name}"?`}
          onConfirm={onDeletion}
        />
        <EditButton onClick={() => { setEditMode(true); }} />
      </>
    </ListItem>
  );
};

export default cold(ExtendedListItem);
