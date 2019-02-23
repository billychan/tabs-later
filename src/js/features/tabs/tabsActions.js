import { normalize } from 'normalizr';
import { getAllTabsFromBrowser } from 'services/browserTabs';
import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,
  TAB_CHECKED_TOGGLE,
  TABS_CHECKED_TOGGLE,
} from './tabsActionTypes';
import { arrayOfTabs } from './tabsSchema';

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

export const checkTabs = (tabIds, checked) => (
  { type: TABS_CHECKED_TOGGLE, payload: { tabIds, checked } }
);
