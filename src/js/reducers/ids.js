import { combineReducers } from 'redux'
import {
  FETCH_TABS_SUCCESS,
} from '../actions/actionTypes'

const allIds = (state=[], action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return action.payload.tabs.result
    default:
      return state
  }
}

const ids = combineReducers({
  allIds
})

export default ids