import { combineReducers } from 'redux'
import byId, { getTabById } from './byId'
import allIds from './allIds'

const tabsApp = combineReducers({
  byId,
  allIds
})

export default tabsApp

export const getAllTabs = (state) =>
  state.allIds.map(id => getTabById(state.byId, id))