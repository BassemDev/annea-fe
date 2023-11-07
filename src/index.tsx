// External dependencies imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

// Internal dependencies imports
import { GlobalStyle } from "./glabalStyle";
import reportWebVitals from "./reportWebVitals";
import { ApolloAppProvider } from "./providers/ApolloAppProvider";
import { Routes } from "./components/routes/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ApolloAppProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloAppProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
