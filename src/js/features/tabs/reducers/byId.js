import {
  FETCH_TABS_SUCCESS,
  TAB_CHECKED_TOGGLE,
} from '../tabsActionTypes';
import tabReducer from './tabReducer';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return {
        ...state,
        ...action.payload.tabs.entities.tab,
      };
    case TAB_CHECKED_TOGGLE: {
      const { tabId } = action.payload;
      return {
        ...state,
        [tabId]: tabReducer(state[tabId], action),
      };
    }
    default:
      return state;
  }
};

export default byId;
