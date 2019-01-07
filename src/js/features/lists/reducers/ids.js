import {
  CREATE_LIST,
} from '../listsActionTypes';

const ids = (state = [], action) => {
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

export default ids;
