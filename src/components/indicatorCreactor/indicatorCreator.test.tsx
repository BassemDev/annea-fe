import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { IndicatorCreator } from "./IndicatorCreator";
import { MockedProvider } from "@apollo/client/testing";
import { PrimeReactProvider } from "primereact/api";

const setup = () => {
  // Arrange
  const utils = render(
    <MockedProvider>
      <PrimeReactProvider>
        <IndicatorCreator />
      </PrimeReactProvider>
    </MockedProvider>,
  );

  const indicatorInput = screen.getByPlaceholderText<HTMLInputElement>(
    "Please type the indicator here.",
  );
  const turbineInput = screen.getByPlaceholderText<HTMLInputElement>(
    "Please type the turbine id.",
  );
  const variableInput = screen.getByPlaceholderText<HTMLInputElement>(
    "Please type the variable here.",
  );
  const timestampFiled = screen.getByTestId("date-time-picker");

  return {
    indicatorInput,
    turbineInput,
    variableInput,
    timestampFiled,
    ...utils,
  };
};

test("<Indicator /> important components should be defined", () => {
  // Arrange
  // Act
  const { indicatorInput, turbineInput, variableInput, timestampFiled } =
    setup();

  // Assert
  expect(indicatorInput).toBeInTheDocument();
  expect(turbineInput).toBeInTheDocument();
  expect(variableInput).toBeInTheDocument();
  expect(timestampFiled).toBeInTheDocument();
});

test("<IndicatorCreator /> User write value in indicator input", () => {
  // Arrange
  const { indicatorInput } = setup();

  // Assert before
  expect(indicatorInput.value).toBe("");

  // Act
  fireEvent.change(indicatorInput, { target: { value: 77 } });

  // Assert after
  expect(indicatorInput.value).toBe("77");
});

test("<IndicatorCreator /> User write value in turbine input", () => {
  // Arrange
  const { turbineInput } = setup();

  // Assert before
  expect(turbineInput.value).toBe("");

  // Act
  fireEvent.change(turbineInput, { target: { value: 77 } });

  // Assert after
  expect(turbineInput.value).toBe("77");
});

test("<IndicatorCreator /> User write value in variable input", () => {
  // Arrange
  const { variableInput } = setup();

  // Assert before
  expect(variableInput.value).toBe("");

  // Act
  fireEvent.change(variableInput, { target: { value: 77 } });

  // Assert after
  expect(variableInput.value).toBe("77");
});
