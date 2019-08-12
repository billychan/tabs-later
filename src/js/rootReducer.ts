import { combineReducers } from 'redux';
import tabs from 'features/tabs/tabsReducers';
import lists from 'features/lists/listsReducers';
import preferences from 'features/preferences/preferencesReducer';

const rootReducer = combineReducers({
  tabs,
  lists,
  preferences
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
