import {
  FETCH_TABS_SUCCESS
} from '../actions/actionTypes'

const byId = (state={}, action) => {
  switch (action.type) {
    case FETCH_TABS_SUCCESS:
      return {
        ...state,
        ...action.payload.tabs.entities.tab
      }
    default:
      return state
  }
}

export default byId

// export const getTabById = (state={}, id) => state[id]
export const getTabById = (state={}, id) => {
  const res = state[id]
  console.log(res)
  return res
}