import {
  FETCH_TABS_SUCCESS, TAB_CHECKED, TAB_UNCHECKED
} from '../actions/actionTypes'
import tab from './tab'

const byId = (state={}, action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return {
        ...state,
        ...action.payload.tabs.entities.tab
      }
    case TAB_UNCHECKED:
    case TAB_CHECKED: {
      const { tabId } = action.payload
      return {
        ...state,
        [tabId]: tab(state[tabId], action)
      }
    }
    default:
      return state
  }
}

export default byId

export const getTabById = (state={}, id) => state[id]