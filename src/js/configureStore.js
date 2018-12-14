import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const configureStore = () => {
  const middleware = [thunk]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
  return store
}

export default configureStore