import * as React from 'react';

import { Portal } from '@blueprintjs/core';

const rootId = 'root';

const Footer = ({ children }: { children: React.ReactChild }) => (
  <Portal
    container={document.getElementById(rootId)}
    className="w-full h-10 bottom-0 top-auto p-4 bg-gray-200 flex items-center"
  >
    {children}
  </Portal>
);

export default Footer;
