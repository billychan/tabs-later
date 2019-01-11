import { combineReducers } from 'redux';
import {
  CREATE_LIST,
} from '../listsActionTypes';

const allIds = (state = [], action) => {
  switch (action.type) {
    case CREATE_LIST:
      return [
        ...state,
        action.payload.id,
      ];
    default:
      return state;
  }
};

const ids = combineReducers({
  allIds,
});

export default ids;
