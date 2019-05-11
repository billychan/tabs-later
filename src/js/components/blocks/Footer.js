import React from 'react';
import PropTypes from 'prop-types';

import { Portal } from '@blueprintjs/core';

const rootId = 'root';

const Footer = ({ children }) => (
  <Portal
    container={document.getElementById(rootId)}
    className="w-full h-8 bottom-0 top-auto"
  >
    <section className="absolute bottom-0 left-0 w-full bg-gray-200 p-2">
      {children}
    </section>
  </Portal>
);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
