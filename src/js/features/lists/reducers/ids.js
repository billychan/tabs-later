import { combineReducers } from 'redux';
import {
  CREATE_LIST_SUCCESS,
  FETCH_LISTS_SUCCESS,
  DELETE_LIST_SUCCESS,
} from '../listsActionTypes';

const allIds = (state = [], action) => {
  switch (action.type) {
    case CREATE_LIST_SUCCESS:
      return [
        ...state,
        action.payload.list.id,
      ];
    case FETCH_LISTS_SUCCESS: {
      return [
        ...state,
        ...action.payload.lists.result,
      ];
    }
    case DELETE_LIST_SUCCESS: {
      const listId = action.payload.list.id;
      return state.filter(id => id !== listId);
    }
    default:
      return state;
  }
};

const ids = combineReducers({
  allIds,
});

export default ids;
