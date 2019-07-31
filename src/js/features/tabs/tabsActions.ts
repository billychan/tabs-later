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

// TODO: Verify this works(including fetch all tabs), and then document this thunk usage pattern
export const closeTabs = (tabIds: string[]) =>
(dispatch: ThunkDispatch<AppState, null, FetchAllTabsAction>) => {
  closeTabsOnBrowser(tabIds).then(() => {
    dispatch(fetchAllTabs());
  });
};

// TODO: Verify this works, and then document this thunk usage pattern
export const openTabs = (urls: TabsLater.Url[]) =>
(dispatch: ThunkDispatch<AppState, null, FetchAllTabsAction>) => {
  openTabsOnBrowser(urls).then(() => {
    dispatch(fetchAllTabs());
  });
};
