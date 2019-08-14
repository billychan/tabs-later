import { mapValues, get, omit } from 'lodash';
import {
  FETCH_TABS_SUCCESS,
  ADD_TAB,
  REMOVE_TAB,
  UPDATE_TAB,

  FetchTabsSuccessAction,
  AddTabAction,
  RemoveTabAction,
  UpdateTabAction,
} from '../types';

type AllowedAction = FetchTabsSuccessAction | AddTabAction | RemoveTabAction | UpdateTabAction;

const byId = (
  state = {}, action: AllowedAction
): Common.ByIdState => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      // Reserve checked state when refreshing
      const refreshedTabs = action.payload.tabs.entities.tab;
      return mapValues(refreshedTabs, (val: TabsLater.Tab, key) => (
        {
          ...val,
          checked: !!(get(state, val.id) || {}).checked
        }
      ));
    case ADD_TAB: {
      const { tab } = action.payload;
      return {
        ...state,
        [tab.id]: tab,
      }
    }
    case REMOVE_TAB: {
      const { id } = action.payload;
      return omit(state, id);
    }
    case UPDATE_TAB: {
      const { changeInfo, id } = action.payload;
      const currentTab = get(state, id);
      if (currentTab) {
        return {
          ...state,
          [id]: {
            ...currentTab,
            ...changeInfo
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
};

export default byId;
