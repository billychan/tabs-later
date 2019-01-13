import { normalize } from 'normalizr';
import {
  fetchLists as fetchListsApi,
  createList as createListApi,
  updateList as updateListApi,
} from 'services/storage';

import { arrayOfLists } from './listsSchema';

import {
  CREATE_LIST,
  UPDATE_LIST,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,
} from './listsActionTypes';

export const createList = ({ name }) => (dispatch) => {
  const list = {
    id: (new Date()).getTime().toString(),
    name,
    links: [],
  };
  createListApi(list).then(() => {
    dispatch({
      type: CREATE_LIST,
      payload: { list },
    });
  });
};

export const updateList = (list, attributes) => (dispatch) => {
  const newwList = { ...list, attributes };
  updateListApi(newwList).then(() => dispatch({
    type: UPDATE_LIST,
    payload: {
      list: newwList,
    },
  }));
};

export const fetchLists = () => (dispatch) => {
  dispatch({
    type: FETCH_LISTS_REQUEST,
  });
  fetchListsApi().then(({ rows }) => {
    const listsResp = rows.map(row => row.doc);
    dispatch({
      type: FETCH_LISTS_SUCCESS,
      payload: { lists: normalize(listsResp, arrayOfLists) },
    });
  });
};
