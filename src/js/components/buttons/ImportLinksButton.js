import React, { useState } from 'react';
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
import { showErrorMessage } from 'components/uiHelpers';
import { ImportButton } from 'components/buttons/ButtonWithTooltip';
import CancelPopoverButton from 'components/buttons/CancelPopoverButton';
import {
  importLinksFromCsv,
} from 'features/lists/entity/linksImpExp';

const ImportForm = ({ onConfirm }) => {
  const [val, setVal] = useState('');
  return (
    <>
      <TextArea
        rows="20"
        className="text-xs my-2"
        placeholder="Please paste CSV text here..."
        onChange={({ target }) => setVal(target.value)}
      />
      <section className="actions">
        <CancelPopoverButton />
        <Button
          text="Import"
          intent={Intent.PRIMARY}
          disabled={!val.length}
          onClick={() => {
            const links = importLinksFromCsv(val);
            if (links) {
              onConfirm({ results: links });
            } else {
              showErrorMessage('Invalid CSV format');
            }
          }}
        />
      </section>
    </>
  );
};

ImportForm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

const ImportMenu = ({ openPanel, onImported }) => {
  const component = cold(ImportForm);
  return (
    <>
      <Menu>
        <MenuItem
          text="Import from CSV"
          shouldDismissPopover={false}
          onClick={() => {
            openPanel({
              component,
              title: 'Import from CSV',
              props: {
                onConfirm({ results }) {
                  onImported({ results });
                },
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

ImportMenu.propTypes = {
  onImported: PropTypes.func.isRequired,
};

const ImportLinksButton = ({ onImported }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onInteraction={(nextState) => {
        setIsOpen(nextState);
      }}
    >
      <ImportButton tooltip="Import Links From CSV" />
      <section className="p-5 w-80 ExportPopoverPanel">
        <PanelStack
          className="h-75"
          initialPanel={{
            component: ImportMenu,
            title: 'Import Links',
            props: {
              onImported({ results }) {
                setIsOpen(false);
                onImported({ results });
              },
            },
          }}
        />
      </section>
    </Popover>
  );
};

ImportLinksButton.propTypes = {
  onImported: PropTypes.func.isRequired,
};

export default cold(ImportLinksButton);
