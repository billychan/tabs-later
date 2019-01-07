import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const preloadedData = {};

const configureStore = () => {
  const middleware = [thunk];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }

  const store = createStore(
    rootReducer,
    preloadedData,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
  }

  return store;
};

export default configureStore;
