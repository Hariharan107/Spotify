import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { StateProvider } from "./store/StateProvider";
import reducer,{ initalState } from "./store/reducer";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider  initialState={initalState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
