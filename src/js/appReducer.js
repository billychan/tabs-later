import { combineReducers } from 'redux';
import tabs from './features/tabs/reducers/tabsReducers';

const appReducer = combineReducers({
  tabs,
});

export default appReducer;
