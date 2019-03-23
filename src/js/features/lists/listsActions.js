import { normalize } from 'normalizr';
import * as storage from 'services/storage';
import { arrayToObjectWithKey } from 'common/helpers';

import { arrayOfLists } from './listsSchema';

import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  BATCH_UPDATE_LISTS_REQUEST,
  BATCH_UPDATE_LISTS_SUCCESS,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,
} from './listsActionTypes';

import {
  buildListFromName, tabToLink, addLinkArrToLinksObj, removeLinksArrFromLinksObj,
} from './listsEntityUtils';

export const createList = ({ listName }) => (dispatch) => {
  dispatch({ type: CREATE_LIST_REQUEST });
  const list = buildListFromName(listName);
  return storage.createList(list).then((resp) => {
    const newList = {
      ...list,
      _rev: resp.rev,
      _id: list.id,
    };
    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: {
        list: newList,
      },
    });
    return newList;
  });
};

export const updateListAttrs = (list, attributes) => (dispatch) => {
  dispatch({ type: UPDATE_LIST_REQUEST });
  const newList = { ...list, ...attributes };
  return storage.updateList(newList).then(resp => dispatch({
    type: UPDATE_LIST_SUCCESS,
    payload: {
      list: {
        ...newList,
        _rev: resp.rev,
      },
    },
  }));
};

const addLinksIntoList = (list, linksArr) => (
  updateListAttrs(list, {
    links: addLinkArrToLinksObj(linksArr, list.links),
  })
);

export const addTabsIntoList = (list, tabs) => (
  addLinksIntoList(list, tabs.map(tabToLink))
);

export const removeLinksFromList = (list, linksArr) => (
  updateListAttrs(list, {
    links: removeLinksArrFromLinksObj(linksArr, list.links),
  })
);

export const deleteList = list => (dispatch) => {
  dispatch({ type: DELETE_LIST_REQUEST });
  return storage.deleteList(list).then(() => dispatch({
    type: DELETE_LIST_SUCCESS,
    payload: { list },
  }));
};

// Note this API was deprecated in favor of update list individually. It might be useful
// for later bulk updating cases, need to re-test
export const bulkUpdateLists = lists => (dispatch) => {
  dispatch({ type: BATCH_UPDATE_LISTS_REQUEST });
  return storage.bulkUpdateLists(lists).then((responses) => {
    const responseObj = arrayToObjectWithKey(responses);
    const listsWithRevUpdated = lists.map(list => ({
      ...list,
      _rev: responseObj[list.id].rev,
    }));
    dispatch({
      type: BATCH_UPDATE_LISTS_SUCCESS,
      payload: { lists: normalize(listsWithRevUpdated, arrayOfLists) },
    });
  });
};

export const fetchLists = () => (dispatch) => {
  dispatch({
    type: FETCH_LISTS_REQUEST,
  });
  storage.fetchLists().then(({ rows }) => {
    const listsResp = rows.map(row => row.doc);
    dispatch({
      type: FETCH_LISTS_SUCCESS,
      payload: { lists: normalize(listsResp, arrayOfLists) },
    });
  });
};
