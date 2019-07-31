import * as React from 'react';
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
import pluralize from 'pluralize';
import { ExportButton } from 'components/buttons/ButtonWithTooltip';
import NoItemsWarningPopover from 'components/popovers/NoItemsWarningPopover';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import {
  exportLinksAsUrls,
  exportLinksAsMarkdown,
  exportLinksAsCsv,
} from 'features/lists/entity/linksImpExp';

const { useEffect } = React;

interface ExportResultsProps {
  results: string[]
}

const ExportResults = ({ results }: ExportResultsProps) => {
  // Note: Used a plain variable instead of useRef here because inputRef from Blueprint expect
  // a function to reassign the ref from param. The type from useRef is not compatible to
  // that ref's type so it can't be used
  let textAreaRef: HTMLTextAreaElement | null = null;
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.select();
    }
  });
  return (
    <>
      <TextArea
        large
        inputRef={ref => (textAreaRef = ref)}
        defaultValue={results}
        rows={20}
      />
      <section className="actions">
        <CancelPopoverButton />
        <Button
          text="Copy"
          intent={Intent.PRIMARY}
          onClick={() => {
            if (textAreaRef) {
              textAreaRef.select();
              document.execCommand('copy');
            }
          }}
        />
      </section>
    </>
  );
};

interface ExportMenuProps {
  openPanel: TabsLater.EventHandler,
  links: TabsLater.Link[]
}

const ExportMenu = ({ openPanel, links }: ExportMenuProps) => {
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
              title: "Exported as Urls",
              props: {
                results: exportLinksAsUrls(links)
              }
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
              title: "Exported as Markdown",
              props: {
                results: exportLinksAsMarkdown(links)
              }
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
              title: "Exported as CSV",
              props: {
                results: exportLinksAsCsv(links)
              }
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

interface ExportLinksButtonProps {
  links: TabsLater.Link[]
}

const ExportLinksButton = ({ links }: ExportLinksButtonProps) => {
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
            title: `${pluralize('link', links.length, true)} selected`,
            props: {
              links,
            },
          }}
        />
      </section>
    </Popover>
  );
};

export default ExportLinksButton;
