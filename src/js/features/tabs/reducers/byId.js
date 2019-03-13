import {
  FETCH_TABS_SUCCESS,
} from '../tabsActionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      // Note here it's state overriding tabs because state has more info such as selected state
      // The result is new tabs will be added but old tabs remain there state unchanged.
      return {
        ...action.payload.tabs.entities.tab,
        ...state,
      };
    default:
      return state;
  }
};

export default byId;
