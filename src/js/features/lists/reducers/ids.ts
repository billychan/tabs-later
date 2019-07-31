import { combineReducers } from 'redux';
import {
  CREATE_LIST_SUCCESS,
  FETCH_LISTS_SUCCESS,
  DELETE_LIST_SUCCESS,

  CreateListSuccessAction,
  FetchListsSuccessAction,
  DeleteListSuccessAction,
} from '../types';

const allIds = (
  state: string[] = [],
  action: CreateListSuccessAction | FetchListsSuccessAction | DeleteListSuccessAction
) => {
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
