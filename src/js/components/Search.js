import React, { useState } from "react";
import {
  Button,
  Colors,
  Icon,
  InputGroup,
} from "@blueprintjs/core";
import { cold } from 'react-hot-loader'

const Search= () => {
  const [query, setQuery] = useState('')
  const DeleteIcon =
    <Icon
      icon='delete'
      iconSize='12'
      style={{ color: Colors.GRAY4 }}
    />
  const DeleteButton =
    <Button
      icon={DeleteIcon}
      onClick={() => setQuery('')}
      className="button-borderless"
    />
  const MaybeDeleteButton = query ? DeleteButton : null
  return (
    <InputGroup
      large={false}
      className="operation-search"
      leftIcon="search"
      onChange={({ target }) => setQuery(target.value)}
      placeholder="Search"
      rightElement={MaybeDeleteButton}
      small
      value={query}
    />
  )
}

export default cold(Search)