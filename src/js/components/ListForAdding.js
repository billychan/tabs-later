import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@blueprintjs/core';

const ListForAdding = ({
  name, onClickAddButton, links, enabled,
}) => {
  const linksCountText = `(${Object.keys(links).length})`;
  return (
    <li className="item-row horizontal-center-aligned">
      <span className="item-row__text item-row__text_main list-item-name">{name}</span>
      <span className="item-row__text item-row__right-secondary text-light">
        <em>{linksCountText}</em>
      </span>
      <Button
        icon={enabled ? 'plus' : 'small-tick'}
        minimal
        disabled={!enabled}
        onClick={onClickAddButton}
      />
    </li>
  );
};

ListForAdding.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  onClickAddButton: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default ListForAdding;
