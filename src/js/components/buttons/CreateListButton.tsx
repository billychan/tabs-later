import * as React from 'react';
import { Classes, Button, Popover } from '@blueprintjs/core';

import EditListForm from 'components/formControls/EditListForm';
import { AddButton } from 'components/buttons/ButtonWithTooltip';

interface CreateListButtonProp {
  onConfirm: TabsLater.EventHandler
}

const CreateListButton = ({ onConfirm }: CreateListButtonProp) => (
  <Popover>
    <AddButton tooltip="Create New List" />
    <section className="p-5 w-80">
      <EditListForm
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

export default CreateListButton;
