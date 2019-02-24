import React, { useState } from 'react';
import {
  Button,
  Colors,
  Icon,
  InputGroup,
} from '@blueprintjs/core';
import { cold } from 'react-hot-loader';

const SearchIcon = (
  <Icon
    icon="search"
    iconSize="12"
    style={{ color: Colors.GRAY4, margin: '6px 0 0 6px' }}
  />
);
const DeleteIcon = (
  <Icon
    icon="delete"
    iconSize="12"
    style={{ color: Colors.GRAY4 }}
  />
);

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const DeleteButton = (
    <Button
      icon={DeleteIcon}
      onClick={() => setQuery('')}
      minimal
      title="Clear"
    />
  );
  const MaybeDeleteButton = query ? DeleteButton : null;
  return (
    <InputGroup
      large={false}
      className="operation-search"
      leftIcon={SearchIcon}
      onChange={({ target }) => setQuery(target.value)}
      placeholder=""
      rightElement={MaybeDeleteButton}
      small
      value={query}
    />
  );
};

export default cold(SearchInput);
