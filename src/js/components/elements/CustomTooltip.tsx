import * as React from 'react';
import { Tooltip } from '@blueprintjs/core';

interface CustomTooltipProps {
  tooltip: string,
  children: React.ReactChildren
}

// Note on `usePortal` prop: If using true(the default) and use the button on the row, there will
// be a quick flash visible, created far away and then moved into right place, not a nice effect.
// Disable `usePortal` solves this.
const CustomTooltip = ({ tooltip, children, ...props }: CustomTooltipProps) => (
  <Tooltip
    content={tooltip}
    hoverOpenDelay={0}
    hoverCloseDelay={0}
    usePortal={false}
    className="whitespace-no-wrap"
    {...props}
  >
    {children}
  </Tooltip>
);

export default CustomTooltip;
