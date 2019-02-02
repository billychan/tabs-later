import {
  FETCH_TABS_SUCCESS,
  TAB_CHECKED_TOGGLE,
} from '../tabsActionTypes';
import tab from './tab';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      // Note here it's state overriding tabs because state has more info such as selected state
      // The result is new tabs will be added but old tabs remain there state unchanged.
      return {
        ...action.payload.tabs.entities.tab,
        ...state,
      };
    case TAB_CHECKED_TOGGLE: {
      const { tabId } = action.payload;
      return {
        ...state,
        [tabId]: tab(state[tabId], action),
      };
    }
    default:
      return state;
  }
};

export default byId;
