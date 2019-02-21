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
  url,
  onChange,
  onMainBodyClicked,
  children,
}) => (
  <li className="TabItem">
    <Checkbox
      className="TabItem__checkbox"
      checked={checked}
      onChange={({ target }) => onChange(id, target.checked)}
    />
    <Favicon url={favIconUrl} />
    <div
      className="TabItem__main"
      title={`${title} - ${url}`}
      role="navigation"
      onClick={onMainBodyClicked}
    >
      <div className="TabItem__main__name">
        {title}
      </div>
      <div className="TabItem__main__url">
        {url}
      </div>
    </div>
    <div className="TabItem__actions TabItem__actions--hover">
      {children}
    </div>
  </li>
);

TabItem.propTypes = {
  checked: PropTypes.bool,
  favIconUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  url: PropTypes.string,
  onChange: PropTypes.func,
  onMainBodyClicked: PropTypes.func,
  children: PropTypes.node,
};

TabItem.defaultProps = {
  checked: false,
  favIconUrl: '',
  id: undefined,
  url: '',
  onChange: noop,
  onMainBodyClicked: noop,
  children: '',
};

export default TabItem;
