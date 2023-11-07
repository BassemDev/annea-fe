import { isFromValuesSame } from "./formHelpers";
import { FormValues } from "./types";

describe("isFromValuesSame", () => {
  it("should return true WHEN values are same (case null)", () => {
    // Arrange
    const oldValues: FormValues = {
      indicator: null,
      variable: null,
      turbineId: null,
      timestamp: null,
    };
    const newValues: FormValues = {
      indicator: null,
      variable: null,
      turbineId: null,
      timestamp: null,
    };

    // Act
    const status = isFromValuesSame(oldValues, newValues);

    // Assert
    expect(status).toEqual(true);
  });

  it("should return true WHEN values are same (case undefined)", () => {
    // Arrange
    const oldValues: FormValues = {
      indicator: undefined,
      variable: undefined,
      turbineId: undefined,
      timestamp: undefined,
    };
    const newValues: FormValues = {
      indicator: undefined,
      variable: undefined,
      turbineId: undefined,
      timestamp: undefined,
    };

    // Act
    const status = isFromValuesSame(oldValues, newValues);

    // Assert
    expect(status).toEqual(true);
  });

  it("should return true WHEN values are same (case numerci valid values)", () => {
    // Arrange
    const oldValues: FormValues = {
      indicator: 3,
      variable: 4,
      turbineId: 5,
      timestamp: new Date(),
    };
    const newValues: FormValues = {
      indicator: 3,
      variable: 4,
      turbineId: 5,
      timestamp: new Date(),
    };

    // Act
    const status = isFromValuesSame(oldValues, newValues);

    // Assert
    expect(status).toEqual(true);
  });

  it("should return false WHEN values are NOT same (case numerci valid values)", () => {
    // Arrange
    const oldValues: FormValues = {
      indicator: 3,
      variable: 4,
      turbineId: 5,
      timestamp: new Date(),
    };
    const newValues: FormValues = {
      indicator: 0,
      variable: 8,
      turbineId: 9,
      timestamp: new Date("2022-12-15"),
    };

    // Act
    const status = isFromValuesSame(oldValues, newValues);

    // Assert
    expect(status).toEqual(false);
  });
});
