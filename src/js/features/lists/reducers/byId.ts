import omit from 'lodash/omit';

import {
  CREATE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
  FETCH_LISTS_SUCCESS,
  BULK_UPDATE_LISTS_SUCCESS,
  DELETE_LIST_SUCCESS,

  CreateListSuccessAction,
  UpdateListSuccessAction,
  DeleteListSuccessAction,
  BulkUpdateListsSuccessAction,
  FetchListsSuccessAction
} from '../types';

type ByIdActions = CreateListSuccessAction | UpdateListSuccessAction | DeleteListSuccessAction |
  BulkUpdateListsSuccessAction | FetchListsSuccessAction;

const byId = (state = {}, action: ByIdActions): Common.ByIdState => {
  switch (action.type) {
    case CREATE_LIST_SUCCESS:
    case UPDATE_LIST_SUCCESS: {
      const { list } = action.payload;
      return {
        ...state,
        [list.id]: list,
      };
    }
    case BULK_UPDATE_LISTS_SUCCESS:
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        ...action.payload.lists.entities.list,
      };
    case DELETE_LIST_SUCCESS: {
      const deletedListId = action.payload.list.id;
      return omit(state, deletedListId)
    }
    default:
      return state;
  }
};

export default byId;
