import * as React from 'react';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { CancelButton, SaveButton } from 'components/buttons/ButtonWithTooltip';

interface ListItemEditModeProps {
  name: string,
  onSave: TabsLater.EventHandler,
  onCancel: TabsLater.EventHandler,
}

const ListItemEditMode = ({
  name,
  onSave,
  onCancel
}: ListItemEditModeProps) => {
  const [value, setValue] = React.useState(name);
  return (
    <li className="relative">
      <span className="block w-10/12">
        <input
          type="text"
          className={classNames(Classes.INPUT, "w-full")}
          value={value}
          name="edit-name"
          onChange={({ target }) => {
            setValue(target.value);
          }}
        />
      </span>
      <div className="children:float-right right-0 absolute-vertical-center w-2/12">
        <SaveButton onClick={() => onSave(value)} />
        <CancelButton onClick={onCancel} />
      </div>
    </li>
  );
};

export default cold(ListItemEditMode);
