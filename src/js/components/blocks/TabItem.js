import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';
import Favicon from 'components/elements/Favicon';
import { noop } from 'common/helpers';
import { cold } from 'react-hot-loader';

/* eslint-disable react/no-danger */
const TabItem = ({
  checked,
  favIconUrl,
  id,
  title,
  url,
  onChange,
  children,
  titleHighlighted,
  urlHighlighted,
}) => {
  const checkboxRef = useRef(null);
  return (
    <li className="group flex relative list-none p-1 items-center h-10 hover:shadow cursor-default">
      <Checkbox
        className="m-0"
        checked={checked}
        ref={checkboxRef}
        onChange={({ target }) => { onChange(id, target.checked); }}
      />
      <Favicon url={favIconUrl} />
      <div
        className="px-1 m-1 truncate"
        title={`${title} - ${url}`}
        role="navigation"
      >
        <div
          className="truncate"
          dangerouslySetInnerHTML={{ __html: titleHighlighted || title }}
        />
        <div
          className="text-xs text-gray-600 truncate"
          dangerouslySetInnerHTML={{ __html: urlHighlighted || url }}
        />
      </div>
      <div className="children:float-right right-0 absolute-vertical-center
        invisible group-hover:visible bg-white"
      >
        {children}
      </div>
    </li>
  );
};

TabItem.propTypes = {
  checked: PropTypes.bool,
  favIconUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  url: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  titleHighlighted: PropTypes.string,
  urlHighlighted: PropTypes.string,
};

TabItem.defaultProps = {
  checked: false,
  favIconUrl: '',
  id: undefined,
  url: '',
  onChange: noop,
  children: '',
  titleHighlighted: '',
  urlHighlighted: '',
};

export default cold(TabItem);
