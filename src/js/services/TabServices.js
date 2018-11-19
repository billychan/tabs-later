
export const getAllTabs = () => (new Promise((resolve) =>
  chrome.tabs.query({
      currentWindow: true
    }, resolve)
  )
)