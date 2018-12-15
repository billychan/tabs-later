import {
  TAB_CHECKED,
  TAB_UNCHECKED
} from '../actions/actionTypes'

const tab = (state={}, action) => {
  switch (action.type) {
    case TAB_CHECKED:
      return {
        ...state,
        checked: true
      } 
    case TAB_UNCHECKED:
      return {
        ...state,
        checked: false
      } 
    default:
      return state
  }
}

export default tab