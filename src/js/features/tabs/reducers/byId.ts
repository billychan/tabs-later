import { mapValues, get } from 'lodash';
import {
  FETCH_TABS_SUCCESS,

  FetchTabsSuccessAction,
} from '../types';

const byId = (
  state = {}, action: FetchTabsSuccessAction
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
    default:
      return state;
  }
};

export default byId;
