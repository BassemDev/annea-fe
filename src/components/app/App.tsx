import React from "react";

import { IndicatorView } from "../indicatorView/IndicatorView";
import styled from "styled-components";

const EmptyContainer = styled.div`
  margin-top: 150px;
`;
export const App: React.FunctionComponent = () => {
  return (
    <>
      <EmptyContainer />
      <IndicatorView />
    </>
  );
};
