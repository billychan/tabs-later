import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  PanelStack,
  Menu,
  MenuItem,
  TextArea,
  Intent,
} from '@blueprintjs/core';
import { cold } from 'react-hot-loader';
import { maybePluralize } from 'common/helpers';
import { ExportButton } from 'components/buttons/ButtonWithTooltip';
import NoItemsWarningPopover from 'components/elements/NoItemsWarningPopover';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import {
  exportLinksAsUrls,
  exportLinksAsMarkdown,
  exportLinksAsCsv,
} from 'features/lists/entity/linksImpExp';

const ExportResults = ({ results }) => {
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.select();
    }
  });
  return (
    <>
      <TextArea
        large
        inputRef={textAreaRef}
        defaultValue={results}
      />
      <section className="actions">
        <CancelPopoverButton />
        <Button
          text="Copy"
          intent={Intent.PRIMARY}
          onClick={() => {
            if (textAreaRef && textAreaRef.current) {
              textAreaRef.current.select();
              document.execCommand('copy');
            }
          }}
        />
      </section>
    </>
  );
};

ExportResults.propTypes = {
  results: PropTypes.string.isRequired,
};

const ExportMenu = ({ openPanel, links }) => {
  const component = cold(ExportResults);
  return (
    <>
      <Menu>
        <MenuItem
          text="Export urls as text"
          shouldDismissPopover={false}
          onClick={() => {
            openPanel({
              component,
              title: 'Exported as Urls',
              props: {
                results: exportLinksAsUrls(links),
              },
            });
          }}
        />
        <Menu.Divider />
        <MenuItem
          text="Export links as Markdown"
          shouldDismissPopover={false}
          onClick={() => {
            openPanel({
              component,
              title: 'Exported as Markdown',
              props: {
                results: exportLinksAsMarkdown(links),
              },
            });
          }}
        />
        <Menu.Divider />
        <MenuItem
          text="Export details as csv(format importable)"
          shouldDismissPopover={false}
          onClick={() => {
            openPanel({
              component,
              title: 'Exported as CSV',
              props: {
                results: exportLinksAsCsv(links),
              },
            });
          }}
        />
        <Menu.Divider />
      </Menu>
      <section className="actions justify-end">
        <CancelPopoverButton />
      </section>
    </>
  );
};

ExportMenu.propTypes = {
  openPanel: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ExportLinksButton = ({ links }) => {
  if (!links.length) {
    return (
      <NoItemsWarningPopover warningText="Please select links to export as various format.">
        <ExportButton tooltip="Export Selected Links" />
      </NoItemsWarningPopover>
    );
  }

  return (
    <Popover>
      <ExportButton tooltip="Export Selected Links" />
      <section className="popover-panel-wrapper p-5 w-80 ExportPopoverPanel">
        <PanelStack
          className="h-75"
          initialPanel={{
            component: ExportMenu,
            title: `${maybePluralize(links.length, 'link')} selected`,
            props: {
              links,
            },
          }}
        />
      </section>
    </Popover>
  );
};

ExportLinksButton.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExportLinksButton;
