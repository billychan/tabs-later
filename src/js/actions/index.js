import { normalize } from 'normalizr'
import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,
  TAB_CHECKED,
  TAB_UNCHECKED
} from './actionTypes'
import { arrayOfTabs } from './schema'

const getAllTabsFromBrowser = () => (new Promise((resolve) =>
  window.chrome.tabs.query({
      currentWindow: true
    }, resolve)
  )
)

export const fetchAllTabs = () => (dispatch) => {
  dispatch({
    type: FETCH_TABS_REQUEST
  })
  getAllTabsFromBrowser().then(tabs => {
    dispatch({
      type: FETCH_TABS_SUCCESS,
      payload: { tabs: normalize(tabs, arrayOfTabs) }
    })
  })
}

export const checkTab = (tabId, checked) => (
  checked ?
    { type: TAB_CHECKED, payload: { tabId } } :
    { type: TAB_UNCHECKED, payload: { tabId } }
)
