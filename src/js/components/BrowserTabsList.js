import React from "react";
import BrowserTab from './BrowserTab';

export default function BrowserTabsList({ tabs }) {
  return (
    <ul className="tabs-list">
      {
        tabs.map((tab, index) => {
          return <BrowserTab tab={tab} key={index} />
        })
      }
    </ul>
  )
}