import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Search } from "./Search";
import { MockedProvider } from "@apollo/client/testing";
import { PrimeReactProvider } from "primereact/api";

test("<Search /> should be defined", () => {
  // Arrange
  render(
    <MockedProvider>
      <PrimeReactProvider>
        <Search loading={false} searchIndicatorById={() => jest.fn()} />
      </PrimeReactProvider>
    </MockedProvider>,
  );

  // Act
  const label = screen.getByLabelText("Search for indicator:");
  const input = screen.getByPlaceholderText("Type an id to start searching...");

  // Assert
  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("<Search /> User write value in search input", () => {
  // Arrange
  render(
    <MockedProvider>
      <PrimeReactProvider>
        <Search loading={false} searchIndicatorById={() => jest.fn()} />
      </PrimeReactProvider>
    </MockedProvider>,
  );

  // Act
  const input = screen.getByPlaceholderText<HTMLInputElement>(
    "Type an id to start searching...",
  );
  fireEvent.change(input, { target: { value: 5 } });

  // Assert
  expect(input.value).toBe("5");
  fireEvent.change(input, { target: { value: 15 } });
  expect(input.value).toBe("15");
});
