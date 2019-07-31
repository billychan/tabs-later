const chromeTabs = window.chrome.tabs;

export const getAllTabsFromBrowser = () => (
  new Promise(resolve => chromeTabs.query({ currentWindow: true }, resolve))
);

export const openTabsOnBrowser = (urls: string[] = []) => {
  const promises = urls.map(url => (
    new Promise(resolve => chromeTabs.create({
      active: false,
      url,
    }, resolve))
  ));
  return Promise.all(promises);
};

export const focusTab = (index: string | number) => (
  new Promise(resolve => chromeTabs.highlight({ tabs: index }, resolve)));

export const closeTabsOnBrowser = (tabIds: (string | number)[]) => (
  new Promise(resolve => chromeTabs.remove(tabIds, resolve))
);
