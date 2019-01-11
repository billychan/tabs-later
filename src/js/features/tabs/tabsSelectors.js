import { getAllItems } from 'common/selectors';

// export const getAllTabIds = state => state.ids.allIds;


const getCheckedTabs = state => getAllItems(state).filter(tab => tab.checked);

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
