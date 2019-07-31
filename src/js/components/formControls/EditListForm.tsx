import * as React from 'react';
import { Classes, Button } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { noop } from 'common/helpers';

const { useState } = React;

interface EditListFormProps {
  onConfirm: TabsLater.EventHandler,
  renderSecondaryButton: TabsLater.Renderer
}

const EditListForm = ({
  onConfirm,
  renderSecondaryButton,
}: EditListFormProps) => {
  const [listName, setListName] = useState('');
  return (
    <>
      <section className="w-60 flex items-center justify-center">
        <input
          type="text"
          className={Classes.INPUT}
          style={{ width: '96%' }}
          placeholder="Enter List Name..."
          name="list-name"
          onChange={event => setListName(event.target.value)}
        />
      </section>
      <section className="actions">
        <div className="ml-auto mr-2">
          { renderSecondaryButton() }
        </div>
        <Button
          text="Create List"
          className={Classes.POPOVER_DISMISS}
          intent="primary"
          onClick={() => {
            onConfirm({ listName });
          }}
        />
      </section>
    </>
  );
};

export default cold(EditListForm);
