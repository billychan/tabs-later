import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Colors,
  Icon,
  InputGroup,
} from "@blueprintjs/core";
import { cold } from 'react-hot-loader'

const TabsBatchOperations = () => {
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
    <section className="tabs-batch-operations">
      <Checkbox className="operation-select-all" />
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
    </section>
  )
}

export default cold(TabsBatchOperations)