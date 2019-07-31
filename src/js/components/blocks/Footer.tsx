import * as React from 'react';

import { Portal } from '@blueprintjs/core';

const rootId = 'root';

const Footer = ({ children }: { children: React.ReactChild }) => (
  <Portal
    container={document.getElementById(rootId)}
    className="w-full h-8 bottom-0 top-auto"
  >
    <section className="absolute bottom-0 left-0 w-full bg-gray-200 p-2">
      {children}
    </section>
  </Portal>
);

export default Footer;
