import React from "react";
import { render, screen } from "@testing-library/react";

import { Hint } from "./Hint";
import { ApolloAppProvider } from "../../../providers/ApolloAppProvider";

test("<Hint /> should be defined", () => {
  // Arrange
  const message = "This is a test";
  render(
    <ApolloAppProvider>
      <Hint message={message} />
    </ApolloAppProvider>,
  );

  // Act
  const messageDisplayed = screen.getByTestId("hint");

  // Assert
  expect(messageDisplayed).toBeInTheDocument();
});

test("<Hint /> should contain the exact messae passed as Props", () => {
  // Arrange
  const message = "This is a test";
  render(
    <ApolloAppProvider>
      <Hint message={message} />
    </ApolloAppProvider>,
  );

  // Act
  const messageDisplayed = screen.getByTestId("hint");

  // Assert
  expect(messageDisplayed.textContent).toBe(message);
});
