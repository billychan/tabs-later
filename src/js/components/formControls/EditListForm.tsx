import * as React from 'react';
import { Classes, Button } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { noop } from 'common/helpers';

const { useState } = React;

interface EditListFormProps {
  onConfirm: ({ listName }: { listName: string }) => void;
  renderSecondaryButton: TabsLater.Renderer;
  mode?: 'add' | 'edit';
  listName?: string;
}

const EditListForm = ({
  onConfirm,
  renderSecondaryButton,
  mode = 'add',
  listName = '',
}: EditListFormProps) => {
  const [listNameAttr, setListNameAttr] = useState(listName);
  return (
    <>
      <section className="w-full flex items-center justify-center">
        <input
          type="text"
          className={Classes.INPUT}
          style={{ width: '96%' }}
          placeholder="Enter List Name..."
          name="list-name"
          autoFocus
          defaultValue={listNameAttr}
          onChange={event => setListNameAttr(event.target.value)}
        />
      </section>
      <section className="actions">
        <div className="ml-auto mr-2">
          { renderSecondaryButton() }
        </div>
        <Button
          text={mode === 'add' ? 'Create List' : 'Confirm Changes'}
          className={Classes.POPOVER_DISMISS}
          intent="primary"
          onClick={() => {
            onConfirm({ listName: listNameAttr });
          }}
        />
      </section>
    </>
  );
};

export default cold(EditListForm);
