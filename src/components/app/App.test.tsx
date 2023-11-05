import React from "react";
import { render, screen } from "@testing-library/react";

import { App } from "./App";
import { ApolloAppProvider } from "../../providers/ApolloAppProvider";

test("Renders app component", () => {
  render(
    <ApolloAppProvider>
      <App />
    </ApolloAppProvider>,
  );
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
