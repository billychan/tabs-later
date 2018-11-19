import React from "react";
import Tab from './Tab';

export default function TabsList({ tabs }) {
  return (
    <ul className="tabs-list">
      {
        tabs.map((tab, index) => {
          return <Tab tab={tab} key={index} />
        })
      }
    </ul>
  )
}