import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const preloadedData = {
  byId: {},
  allIds: []
}

const configureStore = () => {
  const middleware = [thunk]

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    preloadedData,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
  return store
}

export default configureStore