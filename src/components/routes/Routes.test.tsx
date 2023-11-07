import React from "react";
import { render, screen } from "@testing-library/react";
import { useLocation, MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

import { GET_INDICATORS } from "../../API/queries/indicators";
import { Routes } from "./Routes";

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

test("should forward to right route", () => {
  // Arrange
  const managedRoute = "/";
  const mocks = [
    {
      request: {
        query: GET_INDICATORS,
      },
      result: {
        data: {
          indicators: [],
        },
      },
    },
  ];
  // Act
  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[managedRoute]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationDisplay />
      </MockedProvider>
    </MemoryRouter>,
  );

  // Assert
  expect(screen.getByTestId("location-display")).toHaveTextContent(
    managedRoute,
  );
});

test("should forward to 404 page", () => {
  // Arrange
  const badRoute = "/wrong";
  const mocks = [
    {
      request: {
        query: GET_INDICATORS,
      },
      result: {
        data: {
          indicators: [],
        },
      },
    },
  ];
  // Act
  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Routes />
      </MockedProvider>
    </MemoryRouter>,
  );

  // Assert
  expect(
    screen.getByText(
      "We are sorry but the page you are looking for does not exist.",
    ),
  ).toBeDefined();
});
