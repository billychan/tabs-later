export const FETCH_TABS_REQUEST = 'FETCH_TABS_REQUEST';
export const FETCH_TABS_SUCCESS = 'FETCH_TABS_SUCCESS';

export interface FetchTabsRequestAction {
  type: typeof FETCH_TABS_REQUEST;
}

export interface FetchTabsSuccessAction {
  type: typeof FETCH_TABS_SUCCESS;
  payload: {
    tabs: TabsLater.NormalizedTabs
  }
}