import React from "react";
import PropTypes from 'prop-types';
import BrowserTab from './BrowserTab';

export default function BrowserTabsList({ tabs }) {
  return (
    <ul className="tabs-list">
      {
        tabs.map((tab) =>
          (<BrowserTab {...tab} key={tab.id} />)
        )
      }
    </ul>
  )
}

BrowserTabsList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired
}