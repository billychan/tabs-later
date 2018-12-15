import {
  FETCH_TABS_SUCCESS
} from '../actions/actionTypes'

const allIds =(state=[], action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return [
        ...state,
        ...action.payload.tabs.result
      ]
    default:
      return state
  }
}

export default allIds