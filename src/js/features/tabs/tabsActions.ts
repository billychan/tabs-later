import { normalize } from 'normalizr';

import { getAllTabsFromBrowser, closeTabsOnBrowser, openTabsOnBrowser } from 'services/browserTabs';
import { arrayOfTabs } from './tabsSchema';

import {
  FETCH_TABS_REQUEST,
  FETCH_TABS_SUCCESS,

  FetchTabsRequestAction,
  FetchTabsSuccessAction
} from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from 'rootReducer';

type FetchAllTabsAction = FetchTabsRequestAction | FetchTabsSuccessAction

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
  closeTabsOnBrowser(tabIds).then(() => {
    // Use setTimeout for there is a latency before browser knows a tab closed
    // IMPROVE: Listen to tab events in the future so that any changes in tabs could be reflected
    // in atom
    setTimeout(() => {
      dispatch(fetchAllTabs());
    }, 100);
  });
};

export const openTabs = (urls: TabsLater.Url[]) =>
(dispatch: ThunkDispatch<AppState, null, FetchAllTabsAction>) => {
  openTabsOnBrowser(urls).then(() => {
    setTimeout(() => {
      dispatch(fetchAllTabs());
    }, 100);
  });
};
