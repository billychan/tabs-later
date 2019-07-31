import * as React from 'react';
import {
  Button,
  Colors,
  Icon,
  InputGroup,
} from '@blueprintjs/core';
import { cold } from 'react-hot-loader';

const { useState } = React;

const SearchIcon = (
  <Icon
    icon="search"
    iconSize={12}
    style={{ color: Colors.GRAY4, margin: '6px 0 0 6px' }}
  />
);

const DeleteIcon = (
  <Icon
    icon="delete"
    iconSize={12}
    style={{ color: Colors.GRAY4 }}
  />
);

interface SearchInputProps {
  onSearch: TabsLater.EventHandler;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const setQueryAndEmit = (queryText: string) => {
    setQuery(queryText);
    onSearch(queryText);
  };
  const DeleteButton = (
    <Button
      icon={DeleteIcon}
      onClick={() => setQueryAndEmit('')}
      minimal
      title="Clear"
    />
  );
  const MaybeDeleteButton = query ? DeleteButton : null;
  return (
    <InputGroup
      large={false}
      className="w-48 mr-3"
      autoFocus
      leftIcon={SearchIcon}
      onChange={(event: React.FormEvent<HTMLInputElement>) => {
        setQueryAndEmit(event.currentTarget.value);
      }}
      placeholder=""
      rightElement={MaybeDeleteButton}
      small
      value={query}
    />
  )
};

export default cold(SearchInput);
