import React, { useState } from "react";
import { Checkbox } from "@blueprintjs/core";

export default function BrowserTab({ tab }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange({ checked }) {
    setIsChecked(checked);
  }

  return (
    <li className="tab flex-container">
      <Checkbox className="tab-checkbox" onChange={handleChange} />
      <span className="tab-favicon"><img src={tab.favIconUrl}></img></span>
      <span className="tab-title">
        <a href={tab.url} alt={tab.title}>{tab.title}</a>
      </span>
    </li>
  )
}
