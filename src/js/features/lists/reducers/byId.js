import {
  CREATE_LIST,
  UPDATE_LIST,
  FETCH_LISTS_SUCCESS,
  BATCH_UPDATE_LISTS_SUCCESS,
} from '../listsActionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST:
    case UPDATE_LIST: {
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
    default:
      return state;
  }
};

export default byId;
