// External dependencies imports
import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./glabalStyle";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";

// Internal dependencies imports
import reportWebVitals from "./reportWebVitals";
import { ApolloAppProvider } from "./providers/ApolloAppProvider";
import { App } from "./components/app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ApolloAppProvider>
        <GlobalStyle />
        <App />
      </ApolloAppProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
