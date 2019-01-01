import { combineReducers } from 'redux';
import byId, { getTabById } from './byId';
import ids from './ids';

const tabsApp = combineReducers({
  byId,
  ids,
});

export default tabsApp;

export const getAllTabs = state => state.ids.allIds.map(id => getTabById(state.byId, id));

export const getAllTabIds = state => state.ids.allIds;

const getCheckedTabs = state => getAllTabs(state).filter(tab => tab.checked);

export const getCheckedStatus = (state) => {
  const allTabsCount = state.ids.allIds.length;
  const checkedTabsCount = getCheckedTabs(state).length;
  const difference = allTabsCount - checkedTabsCount;

  if (checkedTabsCount === 0) {
    return 0;
  }

  if (difference === 0) {
    return 2;
  }
  return 1;
};
