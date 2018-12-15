import React from "react";
import PropTypes from 'prop-types';
import Tab from './Tab';

const TabsList = ({ tabs }) => (
    <ul className="tabs-list">
      {
        tabs.map((tab) =>
          (<Tab {...tab} key={tab.id} />)
        )
      }
    </ul>
  )

TabsList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TabsList