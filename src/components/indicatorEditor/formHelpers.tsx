import { FormValues } from "./types";

export const isFromValuesSame = (
  oldValues: FormValues,
  newValues: FormValues,
) => {
  return (
    oldValues.turbineId === newValues.turbineId &&
    oldValues.indicator === newValues.indicator &&
    oldValues.variable === newValues.variable &&
    String(oldValues.timestamp) === String(newValues.timestamp)
  );
};
