import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import omit from 'lodash/omit';
import {
  FETCH_TABS_SUCCESS,
  UPDATE_TAB,

  FetchTabsSuccessAction,
  UpdateTabAction,
} from '../types';

type AllowedAction = FetchTabsSuccessAction | UpdateTabAction;

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
