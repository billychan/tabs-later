import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { Button } from '@blueprintjs/core';

// TODO consider deleting this component.
const OpenLinkButton = ({ onClick, title }) => (
  <Button
    icon="document-open"
    minimal
    onClick={onClick}
    title={title}
  />
);

OpenLinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

OpenLinkButton.defaultProps = {
  title: 'Open in new tab',
};

export default cold(OpenLinkButton);
