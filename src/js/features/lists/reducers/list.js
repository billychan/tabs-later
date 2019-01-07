import {
  CREATE_LIST,
} from '../listsActionTypes';

const list = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default list;
