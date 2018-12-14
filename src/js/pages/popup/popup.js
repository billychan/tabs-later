import React from "react";
import { render } from "react-dom";
import App from "../../containers/App";
import { setConfig } from 'react-hot-loader';

setConfig({
  // set this flag to support SFC if patch is not landed
  pureSFC: true
});

/* eslint-disable no-undef */
render(
  <App />,
  document.getElementById("root")
);