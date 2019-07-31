import * as React from 'react';
import { Button } from '@blueprintjs/core';
import EditListForm from 'components/formControls/EditListForm';

interface ListEditParams {
  listName: string
}

interface CreateListPanelProps {
  closePanel: () => void
  onConfirm: (params: ListEditParams) => void
} 

const CreateListPanel = ({ closePanel, onConfirm }: CreateListPanelProps) => (
  <div className="panel-content">
    <EditListForm
      onConfirm={({ listName }: ListEditParams) => {
        closePanel();
        onConfirm({ listName });
      }}
      renderSecondaryButton={() => (
        <Button
          text="Back"
          onClick={() => {
            closePanel();
          }}
        />
      )}
    />
  </div>
);

export default CreateListPanel;
