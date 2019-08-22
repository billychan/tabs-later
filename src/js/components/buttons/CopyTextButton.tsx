import * as React from 'react';

import { CopyButton } from 'components/buttons/ButtonWithTooltip';
import { showSuccessMessage } from 'components/uiHelpers';

interface CopyTextButtonProps {
  itemName: string;
  text: string;
}

const CopyTextButton = ({
  itemName,
  text,
}: CopyTextButtonProps) => (
  <CopyButton
    tooltip={`Copy ${itemName}`}
    onClick={() => {
      window.navigator.clipboard.writeText(text).then(() => {
        showSuccessMessage(`${itemName} copied`);
      })
    }}
  />
)

export default CopyTextButton