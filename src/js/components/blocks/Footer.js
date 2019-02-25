import React from 'react';
import PropTypes from 'prop-types';

import { Portal } from '@blueprintjs/core';

const rootId = 'root';

const Footer = ({ children }) => (
  <Portal container={document.getElementById(rootId)} className="footer">
    {children}
  </Portal>
);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
