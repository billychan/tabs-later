export const getAllTabsFromBrowser = () => (
  new Promise(resolve => window.chrome.tabs.query({ currentWindow: true }, resolve))
);
