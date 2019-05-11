import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  Classes,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { cold } from 'react-hot-loader';

import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import { OpenLinkButton } from 'components/buttons/ButtonWithTooltip';

const OpeningConfirmation = ({ urls, existingTabUrls, onOpenUrls }) => {
  const uniqueUrls = urls.filter(url => !existingTabUrls.includes(url));
  const duplicationsCount = urls.length - uniqueUrls.length;
  const urlsCount = urls.length;
  return (
    <div className="text-center">
      { duplicationsCount > 0
        ? (
          <div>
            <p className="my-2">
              {`${duplicationsCount} out of ${urlsCount} url(s) already opened as tabs. \
              Do you want to open them in new tabs anyway?`}
            </p>
            <p className="mb-2">
              <Button
                text={`Yes, open all ${urlsCount} url(s)`}
                className={classNames('w-56', Classes.POPOVER_DISMISS)}
                onClick={() => onOpenUrls(urls)}
              />
            </p>
          </div>
        )
        : null}
      <p className="mb-2">
        { uniqueUrls.length
          ? (
            <Button
              text={`Open ${uniqueUrls.length} unique url(s) only`}
              intent="primary"
              className={classNames('w-56', Classes.POPOVER_DISMISS)}
              onClick={() => onOpenUrls(uniqueUrls)}
            />
          )
          : null
        }
      </p>
      <p className="mb-2">
        <CancelPopoverButton className="w-56" />
      </p>
    </div>
  );
};

const BulkOpenUrlsButton = ({ urls, existingTabUrls, onOpenUrls }) => {
  if (!urls.length) {
    return (
      <NoItemsWarningPopover warningText="Please select links to open as tabs">
        <OpenLinkButton tooltip="Open selected links" />
      </NoItemsWarningPopover>
    );
  }
  return (
    <Popover>
      <OpenLinkButton tooltip="Open selected links" />
      <div className="p-5 w-80">
        <p className="text-center font-bold">Open Urls</p>
        <OpeningConfirmation
          urls={urls}
          existingTabUrls={existingTabUrls}
          onOpenUrls={onOpenUrls}
        />
      </div>
    </Popover>
  );
};

OpeningConfirmation.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  existingTabUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenUrls: PropTypes.func.isRequired,
};

BulkOpenUrlsButton.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  existingTabUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenUrls: PropTypes.func.isRequired,
};

export default cold(BulkOpenUrlsButton);
