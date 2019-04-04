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
  buildListFromName,
  addLinkArrToLinksObj,
  removeLinksArrFromLinksObj,
  pickListAttributes,
  pickLinkAttributes,
} from './listsEntityUtils';

export const createList = ({ listName }) => (dispatch) => {
  dispatch({ type: CREATE_LIST_REQUEST });
  const list = pickListAttributes(buildListFromName(listName));
  return storage.createList(list).then((resp) => {
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

export const updateListAttrs = (list, attributes) => (dispatch) => {
  dispatch({ type: UPDATE_LIST_REQUEST });
  const targetList = pickListAttributes({ ...list, ...attributes });
  return storage.updateList(targetList).then(resp => dispatch({
    type: UPDATE_LIST_SUCCESS,
    payload: {
      list: {
        ...targetList,
        _rev: resp.rev,
      },
    },
  }));
};

export const bulkUpdateLists = lists => (dispatch) => {
  dispatch({ type: BATCH_UPDATE_LISTS_REQUEST });
  return storage.bulkUpdateLists(lists.map(pickListAttributes)).then((responses) => {
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

const addLinksIntoList = (list, linksArr) => (
  updateListAttrs(list, {
    links: addLinkArrToLinksObj(linksArr, list.links),
  })
);

export const addTabsIntoList = (list, tabs) => (
  addLinksIntoList(list, tabs.map(pickLinkAttributes))
);

export const moveTabsIntoList = (sourceList, links, targetList) => {
  const cleanedLinks = links.map(pickLinkAttributes);
  const lists = [
    { ...sourceList, links: removeLinksArrFromLinksObj(cleanedLinks, sourceList.links) },
    { ...targetList, links: addLinkArrToLinksObj(cleanedLinks, targetList.links) },
  ].map(pickListAttributes);
  return bulkUpdateLists(lists);
};

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
