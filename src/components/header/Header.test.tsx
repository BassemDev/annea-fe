import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter, useLocation } from "react-router-dom";

import { Header } from "./Header";
import { PATH_ROUTES } from "../../constants/pathRoutes";

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const setup = () => {
  // Arrange
  const utils = render(
    <MockedProvider>
      <PrimeReactProvider>
        <BrowserRouter>
          <Header />
          <LocationDisplay />
        </BrowserRouter>
      </PrimeReactProvider>
    </MockedProvider>,
  );

  const homeNavLink = screen.getByText<HTMLInputElement>("Home");
  const newIndicatorNavLink =
    screen.getByText<HTMLInputElement>("New Indicator");

  return {
    homeNavLink,
    newIndicatorNavLink,
    ...utils,
  };
};

test("<Header /> navigation link should be defined", () => {
  // Arrange
  // Act
  const { homeNavLink, newIndicatorNavLink } = setup();

  // Assert
  expect(homeNavLink).toBeInTheDocument();
  expect(newIndicatorNavLink).toBeInTheDocument();
});

test("<Header /> should forward to new indicator page", () => {
  // Arrange
  // Act
  const { newIndicatorNavLink } = setup();

  // Assert
  fireEvent.click(newIndicatorNavLink);
  expect(screen.getByTestId("location-display")).toHaveTextContent(
    PATH_ROUTES.creatorPage,
  );
});

test("<Header /> should forward to home page", () => {
  // Arrange
  // Act
  const { homeNavLink, newIndicatorNavLink } = setup();

  // Assert
  fireEvent.click(newIndicatorNavLink);
  expect(screen.getByTestId("location-display")).toHaveTextContent(
    PATH_ROUTES.creatorPage,
  );
  fireEvent.click(homeNavLink);
  expect(screen.getByTestId("location-display")).toHaveTextContent(
    PATH_ROUTES.home,
  );
});
