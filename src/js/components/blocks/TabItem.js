import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';
import Favicon from 'components/elements/Favicon';
import { noop } from 'common/helpers';

const TabItem = ({
  checked,
  favIconUrl,
  id,
  title,
  onChange,
  children,
}) => (
  <li className="TabItem">
    <Checkbox
      className="TabItem__checkbox"
      checked={checked}
      onChange={({ target }) => onChange(id, target.checked)}
    />
    <Favicon url={favIconUrl} />
    <span className="TabItem__main">
      <span className="TabItem__main__name">
        {title}
      </span>
    </span>
    <span className="TabItem__actions TabItem__actions--hover">
      {children}
    </span>
  </li>
);

TabItem.propTypes = {
  checked: PropTypes.bool,
  favIconUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

TabItem.defaultProps = {
  checked: false,
  favIconUrl: '',
  id: undefined,
  onChange: noop,
  children: '',
};

export default TabItem;
