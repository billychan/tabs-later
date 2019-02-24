import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { Button } from '@blueprintjs/core';

const TabItemActions = ({ onOpeningLink, openButtonTitle }) => (
  <Button
    icon="document-open"
    minimal
    onClick={onOpeningLink}
    title={openButtonTitle}
  />
);

TabItemActions.propTypes = {
  onOpeningLink: PropTypes.func.isRequired,
  openButtonTitle: PropTypes.string,
};

TabItemActions.defaultProps = {
  openButtonTitle: 'Open in new tab',
};

export default cold(TabItemActions);
