import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { IndicatorTable } from "../indicatorTable/IndicatorTable";
import {
  GET_INDICATORS,
  GET_INDICATORS_BY_ID,
} from "../../API/queries/indicators";
import {
  DeletedIndicator,
  Indicator,
} from "../../__generated_graphql__/graphql";
import { Search } from "../search/Search";
import { DELETE_INDICATOR } from "../../API/mutation/indicators";

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
  // Fetched of the list of indicators
  const { loading, error, data, refetch } = useQuery<{
    indicators: Indicator[];
  }>(GET_INDICATORS);

  // Fetch indicator by id (Lazy fetch because it depends on later event user interaction)
  const [
    getIndicatorById,
    { loading: loadingloadingGetIndicatorById, error: errorGetIndicatorById },
  ] = useLazyQuery<{ indicator: Indicator }>(GET_INDICATORS_BY_ID);

  // Delete indicator mutation when clicking on the delete icon
  const [deleteIndicator] = useMutation<DeletedIndicator>(DELETE_INDICATOR, {
    refetchQueries: [GET_INDICATORS],
  });

  const [listOfIndicator, setListOnIndicator] = useState<Indicator[]>([]);
  const toast = useRef<Toast>(null);

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

  const accept = async (id: number) => {
    const response = await deleteIndicator({ variables: { id } });
    if (toast && toast.current) {
      if (response.data?.affected !== 0) {
        toast.current.show({
          severity: "info",
          summary: "Confirmed",
          detail: `Operation successful - Indicator with ${id} does NOT exist any more.`,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Not possible",
          detail:
            "You request failed - please check the indicator you would like to delete",
          life: 3000,
        });
      }
    }
  };

  const reject = () => {
    if (toast && toast.current) {
      toast.current.show({
        severity: "warn",
        summary: "Cancelled",
        detail: "You decided to cancel the operation",
        life: 3000,
      });
    }
  };

  const handleIndicatorDelete = (id: number) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
      reject,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Wrapper>
      <Toast ref={toast} />
      <Search
        searchIndicatorById={handleSearchIndicator}
        loading={loadingloadingGetIndicatorById}
      />
      <IndicatorTable
        indicators={listOfIndicator}
        error={errorGetIndicatorById}
        onIndicatorDelete={handleIndicatorDelete}
      />
      <ConfirmDialog />
    </Wrapper>
  );
};
