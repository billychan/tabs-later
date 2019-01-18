import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ name, links, children }) => {
  const linksCountText = `(${Object.keys(links).length})`;
  return (
    <li className="item-row horizontal-center-aligned">
      <span className="item-row__text item-row__text_main list-item-name">{name}</span>
      <span className="item-row__text item-row__right-secondary text-light">
        <em>{linksCountText}</em>
      </span>
      { children }
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  children: PropTypes.node,
};

ListItem.defaultProps = {
  children: '',
};

export default ListItem;
