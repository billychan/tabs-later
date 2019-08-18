import * as React from 'react';
import { Classes, Button, Popover } from '@blueprintjs/core';

import EditListForm from 'components/formControls/EditListForm';
import { AddButton, EditButton } from 'components/buttons/ButtonWithTooltip';

interface CreateEditListButtonProp {
  onConfirm: ({ listName }: { listName: string }) => void;
  mode?: 'add' | 'edit';
  listName?: string;
}

const CreateEditListButton = ({
  onConfirm,
  mode = 'add',
  listName = '',
}: CreateEditListButtonProp) => (
  <Popover>
    {
      mode === 'add' 
      ? <AddButton tooltip="Create New List" />
      : <EditButton tooltip="Confirm Changes" />
    }
    <section className="p-5 w-80">
      <EditListForm
        mode={mode}
        listName={listName}
        onConfirm={({ listName }) => {
          onConfirm({ listName });
        }}
        renderSecondaryButton={() => (
          <Button
            text="Cancel"
            className={Classes.POPOVER_DISMISS}
          />
        )}
      />
    </section>
  </Popover>
);

export default CreateEditListButton;
