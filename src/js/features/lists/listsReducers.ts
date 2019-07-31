import { combineReducers } from 'redux';

import byId from './reducers/byId';
import ids from './reducers/ids';

const lists = combineReducers({
  byId,
  ids,
});

export default lists;
