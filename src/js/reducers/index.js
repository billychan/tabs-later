import { combineReducers } from 'redux';
import tabs from './tabs';

const appReducer = combineReducers({
  tabs,
});

export default appReducer;
