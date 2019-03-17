const chromeTabs = window.chrome.tabs;

export const getAllTabsFromBrowser = () => (
  new Promise(resolve => chromeTabs.query({ currentWindow: true }, resolve))
);

export const openTabsOnBrowser = (urls = []) => {
  const promises = urls.map(url => (
    new Promise(resolve => chromeTabs.create({
      active: false,
      url,
    }, resolve))
  ));
  return Promise.all(promises);
};

export const focusTab = index => (
  new Promise(resolve => chromeTabs.highlight({ tabs: index }, resolve)));

export const closeTabs = tabIds => (
  new Promise(resolve => chromeTabs.remove(tabIds, resolve))
);
