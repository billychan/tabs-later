import { normalize } from 'normalizr';
import { getAllTabsFromBrowser } from 'services/browserTabs';
import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,
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
