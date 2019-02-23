import {
  FETCH_TABS_SUCCESS,
  TAB_CHECKED_TOGGLE,
  TABS_CHECKED_TOGGLE,
} from '../tabsActionTypes';
import { toggleTab } from './tab';

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
        [tabId]: toggleTab(state[tabId], action.payload.checked),
      };
    }
    case TABS_CHECKED_TOGGLE: {
      const { tabIds, checked } = action.payload;
      return tabIds.reduce((acc, tabId) => ({
        ...acc,
        [tabId]: toggleTab(state[tabId], checked),
      }), state);
    }
    default:
      return state;
  }
};

export default byId;
