import { combineReducers } from 'redux';
import tabs from './features/tabs/tabsReducers';
import lists from './features/lists/listsReducers';

const rootReducer = combineReducers({
  tabs,
  lists,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
