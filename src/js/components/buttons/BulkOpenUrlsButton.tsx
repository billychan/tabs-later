import * as React from 'react';
import pluralize from 'pluralize';
import {
  Button,
  Popover,
  Classes,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { cold } from 'react-hot-loader';

import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/popovers/NoItemsWarningPopover';
import { OpenLinkButton } from 'components/buttons/ButtonWithTooltip';

interface BulkOpenUrlsButtonProps {
  urls: TabsLater.Url[]
  existingTabUrls: TabsLater.Url[]
  onOpenUrls: TabsLater.EventHandler
}

const BulkOpenUrlsButton = ({
  urls,
  existingTabUrls,
  onOpenUrls
}: BulkOpenUrlsButtonProps) => {
  if (!urls.length) {
    return (
      <NoItemsWarningPopover warningText="Please select links to open as tabs">
        <OpenLinkButton tooltip="Open selected links" />
      </NoItemsWarningPopover>
    );
  }
  const uniqueUrls = urls.filter(url => !existingTabUrls.includes(url));
  const duplicationsCount = urls.length - uniqueUrls.length;
  const urlsCount = urls.length;

  return (
    <Popover>
      <OpenLinkButton tooltip="Open selected links" />
      <div className="p-5 w-80">
        <p className="text-center font-bold pb-4">Open Urls</p>
        <div className="text-center">
          {duplicationsCount > 0 ? (
            <div>
              <p className="mt-2 mb-4 text-left">
                {`${duplicationsCount} out of ${pluralize('url', urlsCount, true)} already opened as tabs. \
                  Do you want to open them in new tabs anyway?`}
              </p>
              <p className="mb-2">
                <Button
                  text={`Yes, open all ${pluralize('url', urlsCount, true)}`}
                  className={classNames("w-56", Classes.POPOVER_DISMISS)}
                  onClick={() => onOpenUrls(urls)}
                />
              </p>
            </div>
          ) : null}
          <p className="mb-2">
            {uniqueUrls.length ? (
              <Button
                text={`Open ${pluralize('unique urls', uniqueUrls.length, true)}`}
                intent="primary"
                className={classNames("w-56", Classes.POPOVER_DISMISS)}
                onClick={() => onOpenUrls(uniqueUrls)}
              />
            ) : null}
          </p>
          <p className="mb-2">
            <CancelPopoverButton className="w-56" />
          </p>
        </div>
      </div>
    </Popover>
  );
};

export default cold(BulkOpenUrlsButton);
