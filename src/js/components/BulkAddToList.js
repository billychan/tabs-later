import React from "react";
import {
  Button,
  PanelStack,
  Popover
} from "@blueprintjs/core";
import AddToListPanel from './AddToListPanel';

const BulkAddToList = () =>
  <Popover>
    <Button
      icon='add-to-artifact'
      minimal
    />
    <div className="add-to-list-box">
      <PanelStack
        initialPanel={{ component: AddToListPanel, title: 'Add To List' }}
      />
    </div>
  </Popover>

export default BulkAddToList