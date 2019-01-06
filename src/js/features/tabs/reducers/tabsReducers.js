import { combineReducers } from 'redux';
import byId from './byId';
import ids from './ids';

const tabs = combineReducers({
  byId,
  ids,
});

export default tabs;
