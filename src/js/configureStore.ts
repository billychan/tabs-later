import { createStore, applyMiddleware, compose } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const preloadedData = {};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preferences']
}

const configureStore = () => {
  const middleware = process.env.NODE_ENV === 'production'
    ? [thunk]
    : [thunk, logger]

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    preloadedData,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
};

export default configureStore;
