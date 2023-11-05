// External dependencies imports
import React from "react";
import ReactDOM from "react-dom/client";

// Internal dependencies imports
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloAppProvider } from "./providers/ApolloAppProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloAppProvider>
      <App />
    </ApolloAppProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
