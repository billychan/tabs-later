import React, { useState, useEffect } from "react";
import { cold } from 'react-hot-loader';
import { getAllTabs } from 'services/TabServices';
import TabsList from '../components/TabsList';

const TabsContainer = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    getAllTabs().then(newTabs => { setTabs(newTabs) })
  }, [])

  return (
    <section className="tabs-container">
      <header>
        <h3>Tabs</h3>
      </header>
      <TabsList tabs={tabs} />
    </section>
  )
}

export default cold(TabsContainer);