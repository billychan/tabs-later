import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@blueprintjs/core';

// Note on `usePortal` prop: If using true(the default) and use the button on the row, there will
// be a quick flash visible, created far away and then moved into right place, not a nice effect.
// Disable `usePortal` solves this.
const CustomTooltip = ({ tooltip, children, ...attrs }) => (
  <Tooltip
    content={tooltip}
    hoverOpenDelay={0}
    hoverCloseDelay={0}
    usePortal={false}
    className="whitespace-no-wrap"
    {...attrs}
  >
    {children}
  </Tooltip>
);

CustomTooltip.propTypes = {
  tooltip: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomTooltip;
