/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type CreateIndicatorInput = {
  /** Indicator associated to the turbine. */
  indicator: Scalars["Float"]["input"];
  timestamp: Scalars["DateTime"]["input"];
  /** Turbine id associated to the indicator. */
  turbineId: Scalars["Int"]["input"];
  /** Variable associated to the entry of every indicator. */
  variable: Scalars["Int"]["input"];
};

export type DeletedIndicator = {
  __typename?: "DeletedIndicator";
  /** Affected id after delete operation */
  affected: Scalars["Int"]["output"];
};

export type Indicator = {
  __typename?: "Indicator";
  /** Indicator id  associated to the indicator */
  id: Scalars["Int"]["output"];
  /** Indicator associated to the turbine */
  indicator: Scalars["Float"]["output"];
  timestamp: Scalars["DateTime"]["output"];
  /** Turbine id associated to the indicator */
  turbineId: Scalars["Int"]["output"];
  /** Variable associated to the entry of every indicator */
  variable: Scalars["Int"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createIndicator: Indicator;
  removeIndicator: DeletedIndicator;
  updateIndicator: Indicator;
};

export type MutationCreateIndicatorArgs = {
  createIndicatorInput: CreateIndicatorInput;
};

export type MutationRemoveIndicatorArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationUpdateIndicatorArgs = {
  updateIndicatorInput: UpdateIndicatorInput;
};

export type Query = {
  __typename?: "Query";
  indicator: Indicator;
  indicators: Array<Indicator>;
  indicatorsByTurbineId: Array<Indicator>;
};

export type QueryIndicatorArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryIndicatorsByTurbineIdArgs = {
  turbineId: Scalars["Int"]["input"];
};

export type UpdateIndicatorInput = {
  id: Scalars["Int"]["input"];
  /** Indicator associated to the turbine. */
  indicator?: InputMaybe<Scalars["Float"]["input"]>;
  timestamp?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** Turbine id associated to the indicator. */
  turbineId?: InputMaybe<Scalars["Int"]["input"]>;
  /** Variable associated to the entry of every indicator. */
  variable?: InputMaybe<Scalars["Int"]["input"]>;
};
