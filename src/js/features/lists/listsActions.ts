import { normalize } from 'normalizr';
import * as storage from 'services/storage';
import { arrayToObjectWithKey } from 'common/helpers';

import { arrayOfLists } from './listsSchema';

import { ThunkAction } from 'redux-thunk';
import { AppState } from 'rootReducer';

import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  BULK_UPDATE_LISTS_REQUEST,
  BULK_UPDATE_LISTS_SUCCESS,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,

  CreateListRequestAction,
  CreateListSuccessAction,

  UpdateListRequestAction,
  UpdateListSuccessAction,

  FetchListsRequestAction,
  FetchListsSuccessAction,

  DeleteListRequestAction,
  DeleteListSuccessAction,

  BulkUpdateListsRequestAction,
  BulkUpdateListsSuccessAction,
} from './types';

import {
  buildListFromName,
  addLinkArrToLinksObj,
  removeLinksArrFromLinksObj,
  pickListAttributes,
  buildLink,
} from './entity/utils';

export const createList = (
  { listName }: { listName: string}
): ThunkAction<
  Promise<TabsLater.List>,
  AppState,
  null, 
  CreateListRequestAction | CreateListSuccessAction
> => (dispatch) => {
  dispatch({ type: CREATE_LIST_REQUEST });
  const list = pickListAttributes(buildListFromName(listName));
  return storage.createList(list).then((resp: PouchDB.Core.Response) => {
    const targetList = {
      ...list,
      _rev: resp.rev,
      _id: list.id,
    };
    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: {
        list: targetList,
      },
    });
    return targetList;
  });
};

export const updateListAttrs = (
  list: TabsLater.List, attributes: TabsLater.ListAttrs
): ThunkAction<
  Promise<any>,
  AppState,
  null,
  UpdateListRequestAction | UpdateListSuccessAction
> => (dispatch) => {
  dispatch({ type: UPDATE_LIST_REQUEST });
  const targetList = pickListAttributes({ ...list, ...attributes });
  return storage.updateList(targetList).then((resp: PouchDB.Core.Response) => dispatch({
    type: UPDATE_LIST_SUCCESS,
    payload: {
      list: {
        ...targetList,
        _rev: resp.rev,
      },
    },
  }));
};

export const bulkUpdateLists = (
  lists: TabsLater.List[]
): ThunkAction<
  Promise<void>,
  AppState,
  null,
  BulkUpdateListsRequestAction | BulkUpdateListsSuccessAction
> => (dispatch) => {
  dispatch({ type: BULK_UPDATE_LISTS_REQUEST });
  return storage.bulkUpdateLists(lists.map(pickListAttributes)).then((resp: TabsLater.ListFromServer[]) => {
    const responseObj = arrayToObjectWithKey(resp);
    const listsWithRevUpdated = lists.map(list => ({
      ...list,
      _rev: responseObj[list.id].rev,
    }));
    dispatch({
      type: BULK_UPDATE_LISTS_SUCCESS,
      payload: { lists: normalize(listsWithRevUpdated, arrayOfLists) },
    });
  });
};

const addLinksIntoList = (
  list: TabsLater.List,
  linksArr: TabsLater.Link[]
) => (
  updateListAttrs(list, {
    links: addLinkArrToLinksObj(linksArr, list.links),
  })
);

export const addTabsIntoList = (
  list: TabsLater.List,
  tabs: TabsLater.Tab[]
) => (
  addLinksIntoList(list, tabs.map(buildLink))
);

export const moveTabsIntoList = (
  sourceList: TabsLater.List,
  links: TabsLater.Link[],
  targetList: TabsLater.List
) => {
  const cleanedLinks = links.map(buildLink);
  const lists = [
    { ...sourceList, links: removeLinksArrFromLinksObj(cleanedLinks, sourceList.links) },
    { ...targetList, links: addLinkArrToLinksObj(cleanedLinks, targetList.links) },
  ].map(pickListAttributes);
  return bulkUpdateLists(lists);
};

export const removeLinksFromList = (list: TabsLater.List, linksArr: TabsLater.Link[]) => (
  updateListAttrs(list, {
    links: removeLinksArrFromLinksObj(linksArr, list.links),
  })
);

export const importLinksToList = addTabsIntoList;

export const deleteList = (
  list: TabsLater.List
): ThunkAction<
  Promise<any>,
  AppState,
  null,
  DeleteListRequestAction | DeleteListSuccessAction
> => (dispatch) => {
  dispatch({ type: DELETE_LIST_REQUEST });
  return storage.deleteList(list).then(() => dispatch({
    type: DELETE_LIST_SUCCESS,
    payload: { list },
  }));
};

export const fetchLists = (
): ThunkAction<
  Promise<any>,
  AppState,
  null,
  FetchListsRequestAction | FetchListsSuccessAction
> => (dispatch) => {
  dispatch({
    type: FETCH_LISTS_REQUEST,
  });
  return storage.fetchLists().then((resp: PouchDB.Core.AllDocsResponse<TabsLater.List>) => {
    const { rows } = resp;
    const listsResp = rows.map(row=> row.doc);
    dispatch({
      type: FETCH_LISTS_SUCCESS,
      payload: { lists: normalize(listsResp, arrayOfLists) },
    });
  });
};
