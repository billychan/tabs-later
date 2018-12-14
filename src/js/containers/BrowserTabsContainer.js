import React, { useState, useEffect } from "react";
import { cold } from 'react-hot-loader';
import { getAllTabs } from 'services/TabServices';
import BrowserTabsList from '../components/BrowserTabsList';
import TabsBatchOperations from '../components/TabsBatchOperations';

const BrowserTabsContainer = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    getAllTabs().then(newTabs => { setTabs(newTabs) })
  }, [])

  return (
    <section className="tabs-container">
      <TabsBatchOperations />
      <BrowserTabsList tabs={tabs} />
    </section>
  )
}

export default cold(BrowserTabsContainer);