import React from "react";

export default function Tab({ tab }) {
  return (
    <li className="tab">
      <div className="tab-favicon"><img src={tab.favIconUrl}></img></div>
      <a href={tab.url}>{tab.title}</a>
    </li>
  )
}
