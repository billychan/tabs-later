import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const setQueryAndEmit = (queryText) => {
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
      className="operation-search"
      autoFocus
      leftIcon={SearchIcon}
      onChange={({ target }) => {
        setQueryAndEmit(target.value);
      }}
      placeholder=""
      rightElement={MaybeDeleteButton}
      small
      value={query}
    />
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default cold(SearchInput);
