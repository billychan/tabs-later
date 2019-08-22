import { normalize } from 'normalizr';

import { getAllTabsFromBrowser, closeTabsOnBrowser, openTabsOnBrowser } from 'services/browserTabs';
import { arrayOfTabs } from './tabsSchema';

import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,
  UPDATE_TAB,

  FetchTabsRequestAction,
  FetchTabsSuccessAction,
  UpdateTabAction,
} from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from 'rootReducer';

type FetchAllTabsAction = FetchTabsRequestAction | FetchTabsSuccessAction

let tabsWatched = false;

export const fetchAllTabs = (
): ThunkAction<
  void,
  AppState,
  null, 
  FetchAllTabsAction
> => (dispatch) => {
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

export const closeTabs = (tabIds: string[]) =>
(dispatch: ThunkDispatch<AppState, null, FetchAllTabsAction>) => {
  closeTabsOnBrowser(tabIds);
};

export const openTabs = (urls: TabsLater.Url[]) =>
(dispatch: ThunkDispatch<AppState, null, FetchAllTabsAction>) => {
  openTabsOnBrowser(urls);
};

export const watchTabChanges = () => 
(dispatch: ThunkDispatch<AppState, null, FetchAllTabsAction | UpdateTabAction >) => {
  if (!tabsWatched) {
    tabsWatched = true;
    // Adding or removing need to fetch all tabs again because the tab indices will change in each
    // tab after that. Updating all so that going to tab could work correctly.
    window.chrome.tabs.onCreated.addListener(() => {
      getAllTabsFromBrowser().then((tabs) => {
        dispatch({
          type: FETCH_TABS_SUCCESS,
          payload: { tabs: normalize(tabs, arrayOfTabs) },
        });
      });
    })
    window.chrome.tabs.onRemoved.addListener(() => {
      getAllTabsFromBrowser().then((tabs) => {
        dispatch({
          type: FETCH_TABS_SUCCESS,
          payload: { tabs: normalize(tabs, arrayOfTabs) },
        });
      });
    })
    window.chrome.tabs.onUpdated.addListener((id: number, changeInfo: TabsLater.TabChangeInfo) => {
      dispatch({
        type: UPDATE_TAB,
        payload: {
          id,
          changeInfo
        }
      });
    })
  }
}
