import * as React from 'react';

import { Checkbox } from '@blueprintjs/core';
import Favicon from 'components/elements/Favicon';
import { cold } from 'react-hot-loader';

interface TabItemProps {
  id?: TabsLater.Id,
  checked?: boolean,
  favIconUrl?: string,
  title: string,
  url: string,
  onChange: TabsLater.EventHandler,
  children: React.ReactChild,
  titleHighlighted?: string
  urlHighlighted?: string,
}

interface CheckableTarget {
  checked: boolean,
}

const TabItem = ({
  id,
  checked = false,
  favIconUrl = '',
  title,
  url,
  onChange,
  children,
  titleHighlighted,
  urlHighlighted,
}: TabItemProps) => {
  const checkboxRef = React.useRef(null);
  return (
    <li className="group flex relative list-none p-1 items-center h-10 hover:shadow hover:bg-gray-100
    cursor-default"
    >
      <Checkbox
        className="m-0"
        checked={checked}
        ref={checkboxRef}
        onChange={({ currentTarget }) => {
          const { checked } = currentTarget;
          onChange(id, checked);
        }}
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

export default cold(TabItem);
