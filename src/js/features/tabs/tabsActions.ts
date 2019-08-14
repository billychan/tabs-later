import { normalize } from 'normalizr';

import { getAllTabsFromBrowser, closeTabsOnBrowser, openTabsOnBrowser } from 'services/browserTabs';
import { arrayOfTabs } from './tabsSchema';

import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,
  REMOVE_TAB,
  ADD_TAB,
  UPDATE_TAB,

  FetchTabsRequestAction,
  FetchTabsSuccessAction,
  RemoveTabAction,
  AddTabAction,
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
(dispatch: ThunkDispatch<AppState, null, AddTabAction | RemoveTabAction | UpdateTabAction >) => {
  if (!tabsWatched) {
    window.chrome.tabs.onCreated.addListener((tab: TabsLater.Tab) => {
      dispatch({
        type: ADD_TAB,
        payload: { tab }
      })
    })
    window.chrome.tabs.onRemoved.addListener((id: number) => {
      dispatch({
        type: REMOVE_TAB,
        payload: { id }
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
    tabsWatched = true;
  }
}
