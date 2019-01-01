import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './containers/App';

import '@blueprintjs/core/lib/css/blueprint';
import '@blueprintjs/icons/lib/css/blueprint-icons';
import '../css/main.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
