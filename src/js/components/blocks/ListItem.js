/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({
  name, links, children, mainCols, actionCols, actionsVisibleOnHover, onClick,
}) => {
  const linksCountText = `(${Object.keys(links).length})`;
  const actionsClass = actionsVisibleOnHover
    ? 'ListItem__actions ListItem__actions--hover'
    : 'ListItem__actions';
  return (
    <li className="ListItem">
      <span
        className={`ListItem__main col-${mainCols} link-reset`}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <span className="ListItem__main__name col-10">{name}</span>
        <span className="ListItem__main__hint col-2">{linksCountText}</span>
      </span>
      <div className={`${actionsClass} col-${actionCols}`}>
        { children }
      </div>
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  mainCols: PropTypes.number,
  actionCols: PropTypes.number,
  children: PropTypes.node,
  actionsVisibleOnHover: PropTypes.bool,
  onClick: PropTypes.func,
};

ListItem.defaultProps = {
  children: '',
  mainCols: 9,
  actionCols: 3,
  actionsVisibleOnHover: false,
  onClick: () => {},
};

export default ListItem;
