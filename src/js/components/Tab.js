import React from "react";
import PropTypes from 'prop-types';

import { Checkbox } from "@blueprintjs/core";
import '../../img/placeholder.ico';

const faviconPlaceholderUrl = '/assets/img/placeholder.ico';

export default function Tab({ isSelected, favIconUrl, title, url }) {
  return (
    <li className="tab flex-container">
      <Checkbox className="tab-checkbox" defaultChecked={isSelected} />
      <span className="tab-favicon">
        <img src={favIconUrl || faviconPlaceholderUrl} alt={title} /></span>
      <span className="tab-title">
        <a href={url} alt={title}>{title}</a>
      </span>
    </li>
  )
}

Tab.propTypes = {
  isSelected: PropTypes.bool,
  favIconUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

Tab.defaultProps = {
  isSelected: false
}
