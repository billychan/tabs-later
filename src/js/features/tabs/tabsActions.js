import { normalize } from 'normalizr';
import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,
  TAB_CHECKED_TOGGLE,
} from './tabsActionTypes';
import { arrayOfTabs } from './tabsSchema';

const getAllTabsFromBrowser = () => (new Promise(resolve => window.chrome.tabs.query({
  currentWindow: true,
}, resolve))
);

export const fetchAllTabs = () => (dispatch) => {
  dispatch({
    type: FETCH_TABS_REQUEST,
  });
  getAllTabsFromBrowser().then((tabs) => {
    dispatch({
      type: FETCH_TABS_SUCCESS,
      payload: { tabs: normalize(tabs, arrayOfTabs) },
    });
  });
};

export const checkTab = (tabId, checked) => (
  { type: TAB_CHECKED_TOGGLE, payload: { tabId, checked } }
);

export const checkTabs = (tabIds, checked) => (dispatch) => {
  tabIds.forEach(tabId => dispatch(checkTab(tabId, checked)));
};
