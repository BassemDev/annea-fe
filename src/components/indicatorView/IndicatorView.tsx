import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLazyQuery, useQuery } from "@apollo/client";

import { IndicatorTable } from "../indicatorTable/IndicatorTable";
import {
  GET_INDICATORS,
  GET_INDICATORS_BY_ID,
} from "../../API/queries/indicators";
import { Indicator } from "../../__generated_graphql__/graphql";
import { Search } from "../search/Search";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const IndicatorView = () => {
  const { loading, error, data, refetch } = useQuery<{
    indicators: Indicator[];
  }>(GET_INDICATORS);
  const [
    getIndicatorById,
    { loading: loadingloadingGetIndicatorById, error: errorGetIndicatorById },
  ] = useLazyQuery<{ indicator: Indicator }>(GET_INDICATORS_BY_ID);
  const [listOfIndicator, setListOnIndicator] = useState<Indicator[]>([]);

  useEffect(() => {
    if (data?.indicators) {
      setListOnIndicator(data?.indicators);
    }
  }, [data]);

  const handleSearchIndicator = async (id: string) => {
    if (id === "") {
      await refetch();
      if (data?.indicators) {
        setListOnIndicator(data?.indicators);
      }
    } else {
      const response = await getIndicatorById({
        variables: { id: Number(id) },
      });
      // Matched Indicator
      if (response.data) {
        const matchedIndicators = [response.data?.indicator];
        setListOnIndicator(matchedIndicators);
      } else {
        setListOnIndicator([]);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Wrapper>
      <Search
        searchIndicatorById={handleSearchIndicator}
        loading={loadingloadingGetIndicatorById}
      />
      <IndicatorTable
        indicators={listOfIndicator}
        error={errorGetIndicatorById}
      />
    </Wrapper>
  );
};
