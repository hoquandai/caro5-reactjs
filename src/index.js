import React from "react";
import ReactDOM from "react-dom";
// react-native
// import { NativeRouter } from "react-router-native";

// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import Caro from "./components/Caro";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your Caro to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
