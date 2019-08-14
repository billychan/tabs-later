import { without } from 'lodash';
import { combineReducers } from 'redux';
import {
  FETCH_TABS_SUCCESS,
  ADD_TAB,
  REMOVE_TAB,

  FetchTabsSuccessAction,
  AddTabAction,
  RemoveTabAction,
} from '../types';

type AllowedAction = FetchTabsSuccessAction | AddTabAction | RemoveTabAction;

const allIds = (
  state: Common.AllIdState = [],
  action: AllowedAction
): Common.AllIdState => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return action.payload.tabs.result;
    case ADD_TAB:
      return state.concat(action.payload.tab.id);
    case REMOVE_TAB:
      return without(state, action.payload.id);
    default:
      return state;
  }
};

const ids = combineReducers({
  allIds,
});

export default ids;
