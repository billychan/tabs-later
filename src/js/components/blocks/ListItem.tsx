import * as React from 'react';
import classNames from 'classnames';

interface ListItemProps {
  name: string,
  links?: TabsLater.LinksObj,
  mainCols?: number,
  children?: React.ReactChild,
  actionsVisibleOnHover?: boolean,
  onClick?: TabsLater.EventHandler
}

const ListItem = ({
  name,
  links = {},
  children,
  mainCols = 9,
  actionsVisibleOnHover = false,
  onClick
}: ListItemProps) => {
  const linksCountText = `(${Object.keys(links).length})`;
  return (
    <li
      className="group flex relative py-1 pl-2 list-none items-center h-8 hover:shadow cursor-default"
      title={name}
    >
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
      <div
        className={classNames(
          "children:float-right right-0 absolute-vertical-center inline-block bg-white",
          actionsVisibleOnHover && "invisible group-hover:visible"
        )}
      >
        {children}
      </div>
    </li>
  );
};

export default ListItem;
