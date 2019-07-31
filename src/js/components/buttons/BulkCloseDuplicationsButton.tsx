import * as React from "react";
import pluralize from "pluralize";
import { Button, Popover } from "@blueprintjs/core";

import { filterDuplications } from "common/helpers";
import CancelPopoverButton from "components/buttons/CancelPopoverButton";
import NoItemsWarningPopover from "components/popovers/NoItemsWarningPopover";
import { RemoveDuplicationsButton } from "components/buttons/ButtonWithTooltip";

interface BulkCloseDuplicationsButtonProps {
  tabs: TabsLater.Tab[];
  onConfirm: TabsLater.EventHandler;
}

const BulkCloseDuplicationsButton = ({
  tabs,
  onConfirm
}: BulkCloseDuplicationsButtonProps) => {
  const duplicatedTabs = filterDuplications<TabsLater.Tab>(tabs, "url");
  const dupSize = duplicatedTabs.length;

  if (!tabs.length) {
    return (
      <NoItemsWarningPopover warningText="Please select items to close duplicated ones among them.">
        <RemoveDuplicationsButton tooltip="Close duplications" />
      </NoItemsWarningPopover>
    );
  }

  return (
    <Popover>
      <RemoveDuplicationsButton tooltip="Close duplications" />
      <section className="p-5">
        {dupSize ? (
          <section className="w-75">
            <p>{`There are duplicated ${pluralize("tab", dupSize, true)}`}</p>
            <ul className="scrollable py-2 max-h-20">
              {duplicatedTabs.map(tab => (
                <li
                  title={tab.url}
                  key={tab.id}
                  className="truncate text-xs mb-2 text-gray-600"
                >
                  {tab.url}
                </li>
              ))}
            </ul>
            <section className="actions">
              <Button
                text="Close Duplicated Tabs"
                intent="primary"
                onClick={() => {
                  onConfirm(duplicatedTabs);
                }}
              />
              <CancelPopoverButton />
            </section>
          </section>
        ) : (
          <section className="w-75">
            <section>
              <p>There is no duplications. All set!</p>
            </section>
            <section className="actions justify-end">
              <CancelPopoverButton />
            </section>
          </section>
        )}
      </section>
    </Popover>
  );
};

export default BulkCloseDuplicationsButton;
