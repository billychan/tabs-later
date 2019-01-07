import { combineReducers } from 'redux';
import byId from './reducers/byId';
import ids from './reducers/ids';

const tabs = combineReducers({
  byId,
  ids,
});

export default tabs;
