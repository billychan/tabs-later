import * as React from 'react';
import { cold } from 'react-hot-loader';

import ListItem from 'components/blocks/ListItem';
import { DeleteButtonWithConfirmation } from 'components/buttons/ButtonWithConfirmation';
import CreateEditListButton from 'components/buttons/CreateEditListButton';

interface ExtendedListItemProps {
  name: string,
  links: TabsLater.LinksObj,
  onSave: (name: string) => void,
  onDeletion: TabsLater.EventHandler,
  onClick: TabsLater.EventHandler,
}

const ExtendedListItem = ({
  name,
  links,
  onSave,
  onDeletion,
  onClick
}: ExtendedListItemProps) => (
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
      <CreateEditListButton
        mode="edit"
        listName={name}
        onConfirm={({ listName }: { listName: string }) => {
          onSave(listName);
        }}
      />
    </>
  </ListItem>
);


export default cold(ExtendedListItem);
