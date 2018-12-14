import React, { useState, useEffect } from "react";
import { cold } from 'react-hot-loader';
import { getAllTabs } from 'services/TabServices';
import TabsList from '../components/TabsList';
import TabsBatchOperations from '../components/TabsBatchOperations';

const TabsContainer = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    getAllTabs().then(newTabs => { setTabs(newTabs) })
  }, [])

  return (
    <section className="tabs-container">
      <TabsBatchOperations />
      <TabsList tabs={tabs} />
    </section>
  )
}

export default cold(TabsContainer);