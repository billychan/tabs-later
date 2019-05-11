/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItem = ({
  name, links, children, mainCols, actionsVisibleOnHover, onClick,
}) => {
  const linksCountText = `(${Object.keys(links).length})`;
  return (
    <li className="group flex relative py-1 pl-2 list-none items-center h-8 hover:shadow" title={name}>
      <span
        className={`flex py-1 truncate w-${mainCols}/12`}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <span className="truncate w-10/12">{name}</span>
        <span className="text-gray-500 text-right pr-2 w-2/12 ">
          {linksCountText}
        </span>
      </span>
      <div className={
        classNames(
          'children:float-right right-0 absolute-vertical-center inline-block bg-white',
          actionsVisibleOnHover && 'invisible group-hover:visible',
        )}
      >
        { children }
      </div>
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired,
  mainCols: PropTypes.number,
  children: PropTypes.node,
  actionsVisibleOnHover: PropTypes.bool,
  onClick: PropTypes.func,
};

ListItem.defaultProps = {
  children: '',
  mainCols: 9,
  actionsVisibleOnHover: false,
  onClick: () => {},
};

export default ListItem;
