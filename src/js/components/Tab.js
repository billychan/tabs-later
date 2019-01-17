import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';
import '../../img/placeholder.ico';

const faviconPlaceholderUrl = '/assets/img/placeholder.ico';

const handleImageError = (event) => {
  const img = event.target;
  img.src = faviconPlaceholderUrl;
  return true;
};

/* eslint-disable jsx-a11y/alt-text */
export default function Tab({
  checked,
  favIconUrl,
  id,
  title,
  url,
  onChange,
}) {
  return (
    <li className="item-row">
      <Checkbox
        checked={checked}
        onChange={({ target }) => onChange(id, target.checked)}
      />
      <span className="item-row__favicon">
        <img src={favIconUrl} onError={handleImageError} />
      </span>
      <span className="item-row__text item-row__text_main">
        <a href={url} alt={title}>{title}</a>
      </span>
    </li>
  );
}

Tab.propTypes = {
  checked: PropTypes.bool,
  favIconUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Tab.defaultProps = {
  checked: false,
  favIconUrl: faviconPlaceholderUrl,
};
