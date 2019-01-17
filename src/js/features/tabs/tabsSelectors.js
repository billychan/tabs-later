import { getAllItems } from 'common/selectors';

export const getCheckedTabs = state => getAllItems(state).filter(tab => tab.checked);
export const getCheckedTabsCount = state => getCheckedTabs(state).length;

/**
 * @return {0|1|2} Checked status: 0 means none, 1 means some, 2 means all
 */
export const getCheckedStatus = (state) => {
  const allTabsCount = state.ids.allIds.length;
  const checkedTabsCount = getCheckedTabsCount(state);
  const difference = allTabsCount - checkedTabsCount;

  if (checkedTabsCount === 0) {
    return 0;
  }

  if (difference === 0) {
    return 2;
  }
  return 1;
};
