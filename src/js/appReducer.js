import { combineReducers } from 'redux';
import tabs from './features/tabs/reducers';

const appReducer = combineReducers({
  tabs,
});

export default appReducer;
