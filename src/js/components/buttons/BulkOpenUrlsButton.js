import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  Classes,
} from '@blueprintjs/core';
import { cold } from 'react-hot-loader';

const OpeningConfirmation = ({ urls, existingTabUrls, onOpenUrls }) => {
  const uniqueUrls = urls.filter(url => !existingTabUrls.includes(url));
  const duplicationsCount = urls.length - uniqueUrls.length;
  const urlsCount = urls.length;
  return (
    <div className="text-center">
      { duplicationsCount > 0
        ? (
          <div>
            <p>
              {`${duplicationsCount} out of ${urlsCount} url(s) already opened as tabs. \
              Do you want to open them in new tabs anyway?`}
            </p>
            <p>
              <Button
                text={`Yes, open all ${urlsCount} url(s)`}
                className={Classes.POPOVER_DISMISS}
                onClick={() => onOpenUrls(urls)}
              />
            </p>
          </div>
        )
        : null}
      <p>
        <Button
          text={`Open ${uniqueUrls.length} unique url(s)`}
          intent="primary"
          className={Classes.POPOVER_DISMISS}
          onClick={() => onOpenUrls(uniqueUrls)}
        />
      </p>
      <p><Button text="Cancel" className={Classes.POPOVER_DISMISS} /></p>
    </div>
  );
};

const BulkOpenUrlsButton = ({ urls, existingTabUrls, onOpenUrls }) => (
  <Popover>
    <Button
      icon="document-open"
      title="Open urls"
      minimal
    />
    <div className="popover-content">
      <h3 className="text-center">Open Urls</h3>
      <div>
        {
          urls.length === 0
            ? 'Please select urls to open as tabs'
            : (
              <OpeningConfirmation
                urls={urls}
                existingTabUrls={existingTabUrls}
                onOpenUrls={onOpenUrls}
              />
            )
        }
      </div>
    </div>
  </Popover>
);

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
