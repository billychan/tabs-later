import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';
import Favicon from 'components/elements/Favicon';
import { noop } from 'common/helpers';
import { cold } from 'react-hot-loader';

const TabItem = ({
  checked,
  favIconUrl,
  id,
  title,
  url,
  onChange,
  children,
}) => {
  const checkboxRef = useRef(null);
  return (
    <li className="TabItem">
      <Checkbox
        className="TabItem__checkbox"
        checked={checked}
        ref={checkboxRef}
        onChange={({ target }) => { onChange(id, target.checked); }}
      />
      <Favicon url={favIconUrl} />
      <div
        className="TabItem__main"
        title={`${title} - ${url}`}
        role="navigation"
        onClick={() => { checkboxRef.current.input.click(); }}
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
};

TabItem.propTypes = {
  checked: PropTypes.bool,
  favIconUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  url: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

TabItem.defaultProps = {
  checked: false,
  favIconUrl: '',
  id: undefined,
  url: '',
  onChange: noop,
  children: '',
};

export default cold(TabItem);
