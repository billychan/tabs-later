import React from 'react';
import PropTypes from 'prop-types';
import { cold } from 'react-hot-loader';

import { Button } from '@blueprintjs/core';

const TabItemActions = ({ onOpeningLink }) => (
  <Button
    icon="document-open"
    minimal
    onClick={onOpeningLink}
  />
);

TabItemActions.propTypes = {
  onOpeningLink: PropTypes.func.isRequired,
};

export default cold(TabItemActions);
