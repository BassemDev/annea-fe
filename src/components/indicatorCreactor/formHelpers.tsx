import { FormValues } from "./types";

export const isValidFormValues = (values: FormValues) => {
  return (
    !!values.indicator &&
    !!values.timestamp &&
    !!values.turbineId &&
    !!values.variable
  );
};
