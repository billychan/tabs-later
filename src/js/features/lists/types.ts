export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE';

export const CREATE_LIST_REQUEST = 'CREATE_LIST_REQUEST';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';

export const UPDATE_LIST_REQUEST = 'UPDATE_LIST_REQUEST';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const UPDATE_LIST_FAILURE = 'UPDATE_LIST_FAILURE';

export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';

export const BULK_UPDATE_LISTS_REQUEST = 'BULK_UPDATE_LISTS_REQUEST';
export const BULK_UPDATE_LISTS_SUCCESS = 'BULK_UPDATE_LISTS_SUCCESS';
export const BULK_UPDATE_LISTS_FAILURE = 'BULK_UPDATE_LISTS_FAILURE';

export interface FetchListsRequestAction {
  type: typeof FETCH_LISTS_REQUEST;
}

export interface FetchListsSuccessAction {
  type: typeof FETCH_LISTS_SUCCESS;
  payload: {
    lists: TabsLater.NormalizedListFromServer;
  }
}

export interface CreateListRequestAction {
  type: typeof CREATE_LIST_REQUEST;
}

export interface CreateListSuccessAction {
  type: typeof CREATE_LIST_SUCCESS;
  payload: {
    list: TabsLater.List
  };
}

export interface UpdateListRequestAction {
  type: typeof UPDATE_LIST_REQUEST;
}

export interface UpdateListSuccessAction {
  type: typeof UPDATE_LIST_SUCCESS;
  payload: {
    list: TabsLater.List
  }
}

export interface DeleteListRequestAction {
  type: typeof DELETE_LIST_REQUEST; 
}

export interface DeleteListSuccessAction {
  type: typeof DELETE_LIST_SUCCESS;
  payload: {
    list: TabsLater.List
  }
}

export interface BulkUpdateListsRequestAction {
  type: typeof BULK_UPDATE_LISTS_REQUEST;
}

export interface BulkUpdateListsSuccessAction {
  type: typeof BULK_UPDATE_LISTS_SUCCESS;
  payload: {
    lists: TabsLater.NormalizedListFromServer;
  }
}
