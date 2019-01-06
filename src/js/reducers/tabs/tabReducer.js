import {
  TAB_CHECKED_TOGGLE,
} from '../../actions/actionTypes';

const tab = (state = {}, action) => {
  switch (action.type) {
    case TAB_CHECKED_TOGGLE:
      return {
        ...state,
        checked: action.payload.checked,
      };
    default:
      return state;
  }
};

export default tab;
