import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';

const List = ({
  id, name, selected, onChange, links,
}) => {
  const linksCountText = links.length ? `(${links.length})` : '';
  return (
    <li className="item-row">
      <span className="item-row__text item-row__text_main list-item-name">{name}</span>
      <span className="item-row__text item-row__right-secondary text-light">
        <em>{linksCountText}</em>
      </span>
      <Checkbox
        className="item-row__checkbox"
        checked={selected}
        onChange={({ target }) => onChange(id, target.checked)}
      />
    </li>
  );
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

List.defaultProps = {
  selected: false,
};

export default List;
