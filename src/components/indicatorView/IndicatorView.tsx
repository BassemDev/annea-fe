import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { IndicatorTable } from "../indicatorTable/IndicatorTable";
import { GET_INDICATORS } from "../../API/queries/indicators";
import { Indicator } from "../../__generated_graphql__/graphql";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const IndicatorView = () => {
  const { loading, error, data } = useQuery<{ indicators: Indicator[] }>(
    GET_INDICATORS,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Wrapper>
      <IndicatorTable indicators={data?.indicators} />
    </Wrapper>
  );
};
