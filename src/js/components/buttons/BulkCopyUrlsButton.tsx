import * as React from 'react';

import NoItemsWarningPopover from 'components/popovers/NoItemsWarningPopover';
import { showSuccessMessage } from 'components/uiHelpers';

import { CopyButton } from 'components/buttons/ButtonWithTooltip';

interface BulkCopyUrlsButtonProps {
  links: TabsLater.Link[];
  targetName?: string;
}

const BulkCopyUrlsButton = ({
  links,
  targetName = "tab"
}: BulkCopyUrlsButtonProps) =>
  links.length ? (
    <CopyButton
      tooltip="Copy URLs"
      onClick={() => {
        const text = links.map(link => link.url).join('\n');
        window.navigator.clipboard.writeText(text).then(() => {
          showSuccessMessage("Urls copied");
        });
      }}
    />
  ) : (
    <NoItemsWarningPopover
      warningText={`Pleas select ${targetName}s at first to copy urls.`}
    >
      <CopyButton tooltip="Copy URLs" />
    </NoItemsWarningPopover>
  );

export default BulkCopyUrlsButton;