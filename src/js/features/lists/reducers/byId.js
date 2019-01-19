import {
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
  FETCH_LISTS_SUCCESS,
  BATCH_UPDATE_LISTS_SUCCESS,
  DELETE_LIST_SUCCESS,
} from '../listsActionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST_SUCCESS:
    case UPDATE_LIST_SUCCESS: {
      const { list } = action.payload;
      return {
        ...state,
        [list.id]: list,
      };
    }
    case BATCH_UPDATE_LISTS_SUCCESS:
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        ...action.payload.lists.entities.list,
      };
    case DELETE_LIST_SUCCESS: {
      const listId = action.payload.list.id;
      const { [listId]: listToDelete, ...remaining } = state;
      return remaining;
    }
    default:
      return state;
  }
};

export default byId;
