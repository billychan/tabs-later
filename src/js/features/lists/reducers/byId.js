import list from './list';
import {
  CREATE_LIST,
} from '../listsActionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      const { id } = action.payload;
      return {
        ...state,
        [id]: list(state[id], action),
      };
    }
    default:
      return state;
  }
};

export default byId;
