export const getAllTabsFromBrowser = () => (
  new Promise(resolve => window.chrome.tabs.query({ currentWindow: true }, resolve))
);

export const openTabsOnBrowser = (urls = []) => {
  const promises = urls.map(url => (
    new Promise(resolve => window.chrome.tabs.create({
      active: false,
      url,
    }, resolve))
  ));
  return Promise.all(promises);
};

export const focusTab = index => (
  new Promise(resolve => window.chrome.tabs.highlight({ tabs: index }, resolve)));
