import { combineReducers } from 'redux';
import {
  CREATE_LIST_SUCCESS,
  FETCH_LISTS_SUCCESS,
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
    default:
      return state;
  }
};

const ids = combineReducers({
  allIds,
});

export default ids;
