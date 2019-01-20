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

import { buildListFromName, tabToLink, addLinksToList } from './listsEntityUtils';

export const createList = ({ name }) => (dispatch) => {
  dispatch({ type: CREATE_LIST_REQUEST });
  const list = buildListFromName(name);
  return storage.createList(list).then((resp) => {
    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: {
        list: {
          ...list,
          _rev: resp.rev,
          _id: list.id,
        },
      },
    });
  });
};

export const updateList = (list, attributes) => (dispatch) => {
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

export const deleteList = list => (dispatch) => {
  dispatch({ type: DELETE_LIST_REQUEST });
  return storage.deleteList(list).then(() => dispatch({
    type: DELETE_LIST_SUCCESS,
    payload: { list },
  }));
};

export const addLinksFromTabs = (lists, tabs) => (dispatch) => {
  dispatch({ type: BATCH_UPDATE_LISTS_REQUEST });
  const links = tabs.map(tabToLink);
  const listsToSave = lists.map(list => addLinksToList(list, links));
  return storage.bulkUpdateLists(listsToSave).then((responses) => {
    const responseObj = arrayToObjectWithKey(responses);
    const listsWithRevUpdated = listsToSave.map(list => ({
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
