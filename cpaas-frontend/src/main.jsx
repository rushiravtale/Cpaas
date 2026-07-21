import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./components/pages/index.jsx";
import { store, persistor, history } from "./store/configure/configureStore.js";
import { ReactNotifications } from "react-notifications-component";

import "react-notifications-component/dist/theme.css";
import Alert  from "./components/common/Alert/AlertView.jsx";
import BigLoader from './components/common/BigLoader/BigLoader.jsx'

import "./index.scss";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(
  <Provider store={store}>

    <PersistGate loading={null} persistor={persistor}>

    <ReactNotifications />
    <BigLoader/>

      <Router history={history}>
        <App />
        <Alert/>
      </Router>
    </PersistGate>
  </Provider>
);
