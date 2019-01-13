import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';

const List = ({ id, name, onChange }) => (
  <li className="item-row">
    <span className="item-row__text_main">{name}</span>
    <Checkbox
      className="item-row__checkbox"
      onChange={({ target }) => onChange(id, target.checked)}
    />
  </li>
);

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default List;
