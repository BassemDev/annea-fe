import React, { FormEvent, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Fieldset } from "primereact/fieldset";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { Toast } from "primereact/toast";

import { IndicatorEditorRouteParam } from "./types";
import styled from "styled-components";
import { GET_INDICATORS_BY_ID } from "../../API/queries/indicators";
import { useMutation, useQuery } from "@apollo/client";
import { Indicator } from "../../__generated_graphql__/graphql";
import { Hint } from "../shared/Hint/Hint";
import { isFromValuesSame } from "./formHelpers";
import DateTimePicker from "react-datetime-picker";
import { UPDATE_INDICATOR } from "../../API/mutation/indicators";
import { DISPLAY_SECOND, SEVERITY } from "../../constants/errorconstants";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 150px;
`;

const InputGroupContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;

  text-align: left;
`;

const StyledInputNumber = styled(InputNumber)`
  cursor: not-allowed;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 60px;
`;

const Spacer = styled.div`
  margin-right: 16px;
`;

const SpacerUp = styled.div`
  margin-top: 2px;
`;

const DateTimePickerContainer = styled.div`
  text-align: left;
`;

export const IndicatorEditor = () => {
  const { id } = useParams<IndicatorEditorRouteParam>();
  const [indicator, setIndicator] = useState<number | null | undefined>();
  const [variable, setVariable] = useState<number | null | undefined>();
  const [turbineId, setTurbineId] = useState<number | null | undefined>();
  const [dateTimeValue, setDateTimeValue] = useState<Value>();
  const toast = useRef<Toast>(null);

  // Fetch data related to indicator loaded in this page
  const { loading, error, data } = useQuery<{
    indicator: Indicator;
  }>(GET_INDICATORS_BY_ID, {
    variables: { id: Number(id) },
    onCompleted: (data) => {
      console.log("this is it", data.indicator);
      setTurbineId(data.indicator.turbineId);
      setIndicator(data.indicator.indicator);
      setVariable(data.indicator.variable);
      setDateTimeValue(new Date(data.indicator.timestamp));
    },
  });

  // Update indicator date
  const [updateIndicator, { loading: updateLoading }] = useMutation<{
    updateIndicator: Indicator;
  }>(UPDATE_INDICATOR, {
    onCompleted: (data) => {
      if (toast && toast.current) {
        toast.current.show({
          severity: SEVERITY.info,
          summary: "Confirmed",
          detail: `Operation successful - Indicator with ${id} was Updated.`,
          life: DISPLAY_SECOND.success,
        });
      }

      setTurbineId(data.updateIndicator.turbineId);
      setIndicator(data.updateIndicator.indicator);
      setVariable(data.updateIndicator.variable);
      setDateTimeValue(new Date(data.updateIndicator.timestamp));
    },
    onError: (error) => {
      console.log("The error is", error);
      if (toast && toast.current) {
        toast.current.show({
          severity: SEVERITY.error,
          summary: "Not possible",
          detail: `Your request failed - Please check the indicator you would like to update.`,
          life: DISPLAY_SECOND.error,
        });
      }
    },
  });

  const handleIndicatorChange = (e: InputNumberValueChangeEvent) => {
    setIndicator(e.value);
  };

  const handleVariableChange = (e: InputNumberValueChangeEvent) => {
    setVariable(e.value);
  };

  const handleTurbineIdChange = (e: InputNumberValueChangeEvent) => {
    setTurbineId(e.value);
  };

  const handleIndicatorUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateIndicator({
      variables: {
        updateIndicatorInput: {
          id: Number(id),
          indicator: Number(indicator),
          variable: Number(variable),
          turbineId: Number(turbineId),
          timestamp: dateTimeValue?.toISOString().replace("T", " "),
        },
      },
    });
  };

  const handleDateTimeUpdate = (e: Value) => {
    setDateTimeValue(e);
  };

  const revertChanges = () => {
    setTurbineId(data?.indicator.turbineId);
    setIndicator(data?.indicator.indicator);
    setVariable(data?.indicator.variable);
    setDateTimeValue(new Date(data?.indicator.timestamp));
  };

  if (loading) {
    return <>We are loading data.....</>;
  }

  if (error) {
    return <>There was an error loading the data </>;
  }

  return (
    <Wrapper>
      <Toast ref={toast} />
      <Fieldset
        legend={`Update Indicator with id ${id}`}
        style={{ width: "50%" }}
      >
        <form onSubmit={handleIndicatorUpdate}>
          <InputGroupContainer>
            <label>Indicator:</label>
            <StyledInputNumber
              value={indicator}
              onValueChange={handleIndicatorChange}
              name="indicator"
              id="indicator"
              minFractionDigits={2}
              maxFractionDigits={5}
            />
            <SpacerUp />
            <Hint message="Indicator is the matrix associated to the turbine based on wind." />
          </InputGroupContainer>
          <InputGroupContainer>
            <label>Turbine id:</label>
            <InputNumber
              value={turbineId}
              onValueChange={handleTurbineIdChange}
              name="turbine-id"
              id="turbine-id"
            />
            <SpacerUp />
            <Hint message="Turbine id the indentifier associated to the turbine matrix." />
          </InputGroupContainer>
          <InputGroupContainer>
            <label>Variable:</label>
            <InputNumber
              value={variable}
              onValueChange={handleVariableChange}
              name="variable"
              id="variable"
            />
            <SpacerUp />
            <Hint message="Varibale is a matrix additional to the indicator in the turbine." />
          </InputGroupContainer>
          <DateTimePickerContainer>
            <DateTimePicker
              onChange={handleDateTimeUpdate}
              value={dateTimeValue}
              format={"y-MM-dd h:mm:ss a"}
            />
          </DateTimePickerContainer>
          <ButtonContainer>
            <Button
              loading={updateLoading}
              label="Save"
              type="submit"
              disabled={isFromValuesSame(
                {
                  indicator: data?.indicator.indicator,
                  variable: data?.indicator.variable,
                  turbineId: data?.indicator.turbineId,
                  timestamp: new Date(data?.indicator.timestamp),
                },
                {
                  indicator,
                  variable,
                  turbineId,
                  timestamp: dateTimeValue,
                },
              )}
            />
            <Spacer />
            <Button
              label="Revert"
              onClick={revertChanges}
              severity="warning"
              type="reset"
            />
          </ButtonContainer>
        </form>
      </Fieldset>
    </Wrapper>
  );
};
