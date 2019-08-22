import without from 'lodash/without';
import { combineReducers } from 'redux';
import {
  FETCH_TABS_SUCCESS,

  FetchTabsSuccessAction,
} from '../types';

type AllowedAction = FetchTabsSuccessAction;

const allIds = (
  state: Common.AllIdState = [],
  action: AllowedAction
): Common.AllIdState => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return action.payload.tabs.result;
   default:
      return state;
  }
};

const ids = combineReducers({
  allIds,
});

export default ids;
