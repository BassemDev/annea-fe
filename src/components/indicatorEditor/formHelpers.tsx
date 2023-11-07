import { Formvalues } from "./types";

export const isFromValuesSame = (
  oldValues: Formvalues,
  newValues: Formvalues,
) => {
  return (
    oldValues.turbineId === newValues.turbineId &&
    oldValues.indicator === newValues.indicator &&
    oldValues.variable === newValues.variable &&
    String(oldValues.timestamp) === String(newValues.timestamp)
  );
};
