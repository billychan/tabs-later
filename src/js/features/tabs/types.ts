export const FETCH_TABS_REQUEST = 'FETCH_TABS_REQUEST';
export const FETCH_TABS_SUCCESS = 'FETCH_TABS_SUCCESS';
export const REMOVE_TAB = 'REMOVE_TAB';
export const ADD_TAB = 'ADD_TAB';
export const UPDATE_TAB = 'UPDATE_TAB';

export interface FetchTabsRequestAction {
  type: typeof FETCH_TABS_REQUEST;
}

export interface FetchTabsSuccessAction {
  type: typeof FETCH_TABS_SUCCESS;
  payload: {
    tabs: TabsLater.NormalizedTabs
  }
}

export interface RemoveTabAction {
  type: typeof REMOVE_TAB;
  payload: {
    id: number
  }
}

export interface AddTabAction {
  type: typeof ADD_TAB;
  payload: {
    tab: TabsLater.Tab
  }
}

export interface UpdateTabAction {
  type: typeof UPDATE_TAB;
  payload: {
    id: number,
    changeInfo: TabsLater.TabChangeInfo
  }
}